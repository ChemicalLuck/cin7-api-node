// Cin7 Omni API — User
// Source: https://api.cin7.com/api/Help/ResourceModel?modelName=User

/** A Cin7 user account (`User` resource model). */
export interface User {
  Id: number; // The user ID
  IsActive?: boolean; // The status of the User
  FirstName?: string; // The user first name
  LastName?: string; // The user last name
  JobTitle?: string; // The user job title
  Email?: string; // The user email
}
