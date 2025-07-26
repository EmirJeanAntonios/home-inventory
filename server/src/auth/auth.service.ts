import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { JwtPayload } from './jwt.strategy';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: {
      id: number;
      name: string;
      description: string;
    };
  };
}

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private rolesService: RolesService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && (await this.usersService.validatePassword(user, pass))) {
            const { password, ...rest } = user;
            return rest;
        }
        return null;
    }

    async register(registerDto: RegisterDto): Promise<LoginResponse> {
        // Check if user already exists
        const existingUser = await this.usersService.findOne(registerDto.email);
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        // Set default role if not provided
        let roleId = 2; // default role id for user


        // Create user
        const user = await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: registerDto.password,
            roleId: roleId
        });

        // Generate JWT token
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            roleId: roleId,
            roleName: user.role.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    async login(loginDto: LoginDto): Promise<LoginResponse> {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            roleId: user.role.id,
            roleName: user.role.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }

    async validateToken(payload: JwtPayload): Promise<any> {
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            return null;
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }

    async getUserById(id: number) {
        return this.usersService.findById(id);
    }
}
