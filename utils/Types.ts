export type CurrentUserResponse = {
  message: string;
  user: {
    balance: number;
    created_at: string;
    updated_at: string;
    email: string;
    id: string;
    name: string;
    username: string;
  };
  roles: {
    level: number;
    name: string;
  }[];
};

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  balance: number;
  roles: {
    name: string;
    level: number;
  }[];
};

export type Users = User[];

export type Role = {
  id: string;
  level: number;
  name: string;
  permissions: {
    name: string;
  }[];
};

export type Roles = Role[];
