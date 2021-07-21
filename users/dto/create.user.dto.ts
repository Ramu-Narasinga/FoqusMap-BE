export interface CreateUserDto {
    id: number;
    uuid?: string;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}