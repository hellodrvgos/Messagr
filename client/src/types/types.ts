export type User = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  isBanned: boolean;
  avatar: string;
  role: string;
  location: string;
  github: string;
  phone: number;
};
