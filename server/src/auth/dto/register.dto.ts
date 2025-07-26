import { IsEmail, IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsNumber({}, { message: 'Role ID must be a number' })
  roleId?: number;
} 