import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  providers: [DatabaseService],
})
export class DatabaseModule {} 