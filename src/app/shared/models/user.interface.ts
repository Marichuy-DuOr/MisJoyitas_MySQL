export type Roles = 'client' | 'admin';

export interface User {
  email: string;
  password: string;
}

export interface UserResponse extends User {
  message: string;
  token: string;
  idUsuario: number;
  rol: Roles;
  nombre: string;
}
