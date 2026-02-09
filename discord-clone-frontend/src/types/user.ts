import { RoleInterface } from "./roles";

export interface UserInterface {
  id: number;
  username: string;
  avatar: string;
  roles: RoleInterface[];
}
