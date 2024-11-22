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
