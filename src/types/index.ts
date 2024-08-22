import { UUID } from "crypto";
import { MouseEventHandler, ReactNode } from "react";

export interface StateProps {
  id: string;
  title: string;
  description: string;
  position1: number;
  position2: number;
  price: number;
  phonenumber: number;
}
export interface UserProps {
  token: string;
  username: string;
  email: string;
  password: string;
}
