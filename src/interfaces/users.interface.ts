export interface User {
  _id: string;
  email?: string;
  phoneNumber: string;
  externalId?: string;
  password?: string;
  roles?: string[];
}

export interface UsersInterface {
  externalId?: string;
  email?: string;
  phoneNumber: string;
  password?: string;
  civility: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  birthplace: string;
  roles?: string[];
}
