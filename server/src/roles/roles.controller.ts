import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() roleData: Partial<Role>): Promise<Role> {
    return this.rolesService.create(roleData);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() roleData: Partial<Role>): Promise<Role> {
    return this.rolesService.update(+id, roleData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.delete(+id);
  }
} 