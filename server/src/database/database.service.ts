import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
    await this.seedUsers();
  }

  private async seedRoles() {
    const roleCount = await this.roleRepository.count();
    
    if (roleCount === 0) {
      const seedRoles = [
        {
          name: 'admin',
          description: 'Administrator with full access',
        },
        {
          name: 'user',
          description: 'Regular user with limited access',
        },
        {
          name: 'moderator',
          description: 'Moderator with management permissions',
        },
      ];

      for (const roleData of seedRoles) {
        const role = this.roleRepository.create(roleData);
        await this.roleRepository.save(role);
      }

      console.log('Initial roles seeded successfully');
    }
  }

  private async seedUsers() {
    const userCount = await this.userRepository.count();
    
    if (userCount === 0) {
      // Get roles for seeding
      const adminRole = await this.roleRepository.findOne({ where: { name: 'admin' } });
      const userRole = await this.roleRepository.findOne({ where: { name: 'user' } });

      const seedUsers = [
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: 'admin123', // Will be hashed by entity hook
          roleId: adminRole.id,
        },
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: 'password123', // Will be hashed by entity hook
          roleId: userRole.id,
        },
        {
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          password: 'password123', // Will be hashed by entity hook
          roleId: userRole.id,
        },
      ];

      for (const userData of seedUsers) {
        const user = this.userRepository.create(userData);
        await this.userRepository.save(user);
      }

      console.log('Initial users seeded successfully');
    }
  }
} 