import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'password',
        },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }
}
