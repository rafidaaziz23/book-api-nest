import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

class userValidation {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
}

@Controller('user')
export class UserController {
  @Get()
  async findAll(): Promise<User[]> {
    try {
      const data = await prisma.user.findMany();
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        throw new NotFoundException('Data not found');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Post()
  async create(@Body() userData: userValidation): Promise<User> {
    try {
      const { name, email, password, roleId } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          roleId: Number(roleId),
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() userData: userValidation,
  ): Promise<User> {
    try {
      const { name, email, password, roleId } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          roleId: Number(roleId),
        },
      });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<User> {
    try {
      const data = await prisma.user.delete({
        where: { id: Number(id) },
      });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      return data;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }
}
