export interface StateProps {
  id: string;
  title: string;
  description: string;
  position1: number;
  position2: number;
  price: number;
  phonenumber: number;
  creator: string;
}
export interface UserProps {
  token: string;
  username: string;
  email: string;
  password: string;
}

export interface EditStateProps {
  phonenumber: number;
  price: number;
  title: string;
  description: string;
  id: string;
}
