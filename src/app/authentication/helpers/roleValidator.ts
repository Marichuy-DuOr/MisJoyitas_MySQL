import { UserResponse } from './../../shared/models/user.interface';

export class RoleValidator {
    isClient(user: UserResponse): boolean {
        return user.rol === 'client';
    }
    isAdmin(user: UserResponse): boolean {
        return user.rol === 'admin';
    }
}