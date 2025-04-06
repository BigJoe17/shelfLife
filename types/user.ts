export type UserRole = 'donor' | 'claimer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
} 