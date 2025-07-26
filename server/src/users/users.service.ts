import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(userData: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(userData);
        // Password will be automatically hashed by the @BeforeInsert hook in the entity
        const savedUser = await this.userRepository.save(user);
        // Fetch the user with relations to ensure role is populated
        return this.findById(savedUser.id);
    }

    async findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOne({ 
            where: { email },
            relations: ['role']
        });
    }

    async findById(id: number): Promise<User | undefined> {
        return this.userRepository.findOne({ 
            where: { id },
            relations: ['role']
        });
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find({
            relations: ['role']
        });
    }

    async update(id: number, userData: UpdateUserDto): Promise<User> {
        // If password is being updated, it will be hashed by @BeforeUpdate hook
        await this.userRepository.update(id, userData);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    async validatePassword(user: User, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
}
