export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormErrors {
  email?: boolean;
  password?: boolean;
}

export interface RegisterFormErrors {
  name?: boolean;
  email?: boolean;
  phone?: boolean;
  password?: boolean;
  confirmPassword?: boolean;
}

export type AuthMode = 'login' | 'register';
