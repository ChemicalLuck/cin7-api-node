import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Cin7Client from "../src/client";
import { Cin7HTTPResponseError, Cin7APIError } from "../src/models";

interface RequestInitLike {
  method?: string;
  headers?: Record<string, string>;
  body?: string | null;
}

interface CapturedRequest {
  url: string;
  init: RequestInitLike;
}

function fakeResponse(init: {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}): Response {
  const { status = 200, body, headers = {} } = init;
  const normalized: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    normalized[k.toLowerCase()] = v;
  }
  const text =
    body === undefined
      ? ""
      : typeof body === "string"
        ? body
        : JSON.stringify(body);
  return {
    status,
    statusText: "",
    ok: status >= 200 && status < 300,
    headers: { get: (k: string) => normalized[k.toLowerCase()] ?? null },
    text: () => Promise.resolve(text)
  } as unknown as Response;
}

const mockedFetch = vi.fn();

function requests(): CapturedRequest[] {
  return mockedFetch.mock.calls.map((c) => ({
    url: c[0] as string,
    init: (c[1] ?? {}) as RequestInitLike
  }));
}

/** Returns the nth captured request, asserting it exists (keeps types tight). */
function requestAt(index = 0): CapturedRequest {
  const req = requests()[index];
  if (!req) {
    throw new Error(`No request captured at index ${index}`);
  }
  return req;
}

const B = "https://api.cin7.com/api";
const USER = "conn-user";
const KEY = "secret-key";
const EXPECTED_AUTH = `Basic ${Buffer.from(`${USER}:${KEY}`).toString("base64")}`;

let client: Cin7Client;

beforeEach(() => {
  mockedFetch.mockReset();
  vi.stubGlobal("fetch", mockedFetch);
  client = new Cin7Client(USER, KEY);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("auth headers", () => {
  it("sends HTTP Basic auth built from username:apiKey", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: {} }));
    await client.get(`${B}/v1/SalesOrders/1`);

    const req = requestAt();
    expect(req.init.headers?.Authorization).toBe(EXPECTED_AUTH);
    expect(req.init.headers?.["Content-Type"]).toBe("application/json");
    expect(req.init.headers?.Accept).toBe("application/json");
  });

  it("does not send any version header (version lives in the path)", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: {} }));
    await client.get(`${B}/v1/Products`);
    const req = requestAt();
    expect(req.init.headers).not.toHaveProperty("X-Cin7-Version");
    expect(req.init.headers).not.toHaveProperty("X-API-Version");
  });
});

describe("request body", () => {
  it("does not send a body on GET", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: [] }));
    await client.get(`${B}/v1/SalesOrders`);
    expect(requestAt().init.body).toBeNull();
  });

  it("serializes the array payload on POST", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: [] }));
    const payload = [{ Reference: "SO-1" }];
    await client.post(`${B}/v1/SalesOrders`, payload);
    expect(requestAt().init.body).toBe(JSON.stringify(payload));
  });

  it("serializes the array payload on PUT", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: [] }));
    const payload = [{ Id: 1, Reference: "SO-1" }];
    await client.put(`${B}/v1/SalesOrders`, payload);
    const req = requestAt();
    expect(req.init.method).toBe("PUT");
    expect(req.init.body).toBe(JSON.stringify(payload));
  });

  it("sends a body on DELETE when provided", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 204 }));
    await client.delete(`${B}/v1/Contacts/1`, { Id: 1 });
    const req = requestAt();
    expect(req.init.method).toBe("DELETE");
    expect(req.init.body).toBe(JSON.stringify({ Id: 1 }));
  });
});

describe("empty / 204 responses", () => {
  it("returns undefined on 204 No Content", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 204 }));
    const result = await client.delete(`${B}/v1/Contacts/1`);
    expect(result).toBeUndefined();
  });

  it("returns undefined on an empty 200 body instead of throwing", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 200, body: "" }));
    const result = await client.get(`${B}/v1/SalesOrders/1`);
    expect(result).toBeUndefined();
  });
});

describe("error handling", () => {
  it("throws Cin7HTTPResponseError carrying status and parsed body", async () => {
    const errorBody = { Errors: ["Reference is invalid"] };
    mockedFetch.mockResolvedValue(
      fakeResponse({ status: 400, body: errorBody })
    );

    await expect(client.get(`${B}/v1/SalesOrders/1`)).rejects.toMatchObject({
      name: "Cin7HTTPResponseError",
      status: 400,
      body: errorBody
    });
  });

  it("Cin7HTTPResponseError is an instance of Error", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 404, body: "" }));
    const err = await client
      .get(`${B}/v1/SalesOrders/1`)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(Cin7HTTPResponseError);
  });
});

describe("retries", () => {
  it("retries on 429 then succeeds", async () => {
    vi.useFakeTimers();
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { ok: true } }));

    const promise = client.get(`${B}/v1/SalesOrders/1`);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual({ ok: true });
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });

  it("honors the Retry-After header for the backoff delay", async () => {
    vi.useFakeTimers();
    mockedFetch
      .mockResolvedValueOnce(
        fakeResponse({ status: 429, headers: { "retry-after": "2" } })
      )
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { ok: true } }));

    const promise = client.get(`${B}/v1/SalesOrders/1`);
    // Not enough time elapsed yet for a 2s Retry-After.
    await vi.advanceTimersByTimeAsync(1000);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
    // After the full 2s, the retry fires.
    await vi.advanceTimersByTimeAsync(1000);
    await promise;
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });

  it("re-sends the request body on retry (POST body is not lost)", async () => {
    vi.useFakeTimers();
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 500 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: [{ id: 1 }] }));

    const payload = [{ Reference: "SO-1" }];
    const promise = client.post(`${B}/v1/SalesOrders`, payload);
    await vi.runAllTimersAsync();
    await promise;

    expect(requests()).toHaveLength(2);
    expect(requestAt(0).init.body).toBe(JSON.stringify(payload));
    expect(requestAt(1).init.body).toBe(JSON.stringify(payload));
  });

  it("throws Cin7APIError after exhausting max retries", async () => {
    vi.useFakeTimers();
    mockedFetch.mockResolvedValue(fakeResponse({ status: 500 }));

    const promise = client
      .get(`${B}/v1/SalesOrders/1`)
      .catch((e: unknown) => e);
    await vi.runAllTimersAsync();
    const err = await promise;

    expect(err).toBeInstanceOf(Cin7APIError);
    // initial attempt + 3 retries
    expect(mockedFetch).toHaveBeenCalledTimes(4);
  });

  it("does not leak retry state across sequential requests", async () => {
    vi.useFakeTimers();
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { a: 1 } }));
    const p1 = client.get(`${B}/v1/SalesOrders/1`);
    await vi.runAllTimersAsync();
    await p1;

    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { b: 2 } }));
    const p2 = client.get(`${B}/v1/SalesOrders/2`);
    await vi.runAllTimersAsync();
    const result = await p2;

    expect(result).toEqual({ b: 2 });
  });
});

describe("pagination", () => {
  function fullPage(id: number): Record<string, number>[] {
    // A page of exactly DEFAULT_ROWS records signals "there may be more".
    return Array.from({ length: Cin7Client.DEFAULT_ROWS }, () => ({ id }));
  }

  it("applies default rows=250 and page=1 on the first request", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: [] }));
    await client.paginate(`${B}/v1/SalesOrders`);
    const req = requestAt();
    expect(req.url).toContain("rows=250");
    expect(req.url).toContain("page=1");
  });

  it("stops after a single short page", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: [{ id: 1 }] }));
    const result = await client.paginate(`${B}/v1/SalesOrders`);
    expect(result).toEqual([{ id: 1 }]);
    expect(mockedFetch).toHaveBeenCalledTimes(1);
  });

  it("follows pages until a short page, concatenating in order", async () => {
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ body: fullPage(1) }))
      .mockResolvedValueOnce(fakeResponse({ body: [{ id: 2 }] }));

    const result = await client.paginate<{ id: number }>(`${B}/v1/SalesOrders`);
    expect(result).toHaveLength(Cin7Client.DEFAULT_ROWS + 1);
    expect(result[result.length - 1]).toEqual({ id: 2 });

    const captured = requests();
    expect(captured).toHaveLength(2);
    expect(requestAt(0).url).toContain("page=1");
    expect(requestAt(1).url).toContain("page=2");
  });

  it("terminates on an empty page after an exactly-full page", async () => {
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ body: fullPage(1) }))
      .mockResolvedValueOnce(fakeResponse({ body: [] }));

    const result = await client.paginate(`${B}/v1/SalesOrders`);
    expect(result).toHaveLength(Cin7Client.DEFAULT_ROWS);
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });

  it("sends where/order/fields on every page", async () => {
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ body: fullPage(1) }))
      .mockResolvedValueOnce(fakeResponse({ body: [{ id: 2 }] }));

    await client.paginate(`${B}/v1/SalesOrders`, {
      where: "Status='FULLYSHIPPED'",
      order: "CreatedDate ASC",
      fields: "Id,Reference"
    });

    const captured = requests();
    for (const req of captured) {
      // URLSearchParams encodes spaces as `+`, which decodeURIComponent leaves
      // intact, so normalize them back to spaces before asserting.
      const decoded = decodeURIComponent(req.url).replace(/\+/g, " ");
      expect(decoded).toContain("where=Status='FULLYSHIPPED'");
      expect(decoded).toContain("order=CreatedDate ASC");
      expect(decoded).toContain("fields=Id,Reference");
    }
  });

  it("respects a caller-supplied rows override", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: [{ id: 1 }] }));
    await client.paginate(`${B}/v1/SalesOrders`, { rows: 1000 });
    expect(requestAt().url).toContain("rows=1000");
  });
});
