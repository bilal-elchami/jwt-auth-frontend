import { Role } from './role';

export class User {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    username: string;
    password: string;
    roles: Role[];
}
