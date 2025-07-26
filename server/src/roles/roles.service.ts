import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async create(roleData: Partial<Role>): Promise<Role> {
        const role = this.roleRepository.create(roleData);
        return this.roleRepository.save(role);
    }

    async findOne(id: number): Promise<Role | undefined> {
        return this.roleRepository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Role | undefined> {
        return this.roleRepository.findOne({ where: { name } });
    }

    async findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async update(id: number, roleData: Partial<Role>): Promise<Role> {
        await this.roleRepository.update(id, roleData);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.roleRepository.delete(id);
    }
} 