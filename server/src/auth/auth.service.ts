import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && await this.usersService.validatePassword(user, pass)) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }
}
