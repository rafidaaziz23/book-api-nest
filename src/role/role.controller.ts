import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

const prisma = new PrismaClient();

class RoleDataInterfaces {
  @IsNotEmpty()
  name: string;
}

@Controller('role')
export class RoleController {
  @Get()
  async findAll(): Promise<Role[]> {
    try {
      const data = await prisma.role.findMany();

      if (!data) {
        throw new NotFoundException('Data not found');
      }

      return data;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Role> {
    try {
      const role = await prisma.role.findUnique({
        where: { id: Number(id) },
      });

      if (!role) {
        throw new NotFoundException('Data not found');
      }

      return role;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Post()
  async create(@Body() roleData: RoleDataInterfaces): Promise<Role> {
    try {
      const { name } = roleData;
      return await prisma.role.create({
        data: {
          name: name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() roleData: RoleDataInterfaces,
  ): Promise<Role> {
    try {
      const { name } = roleData;
      const data = await prisma.role.update({
        where: { id: Number(id) },
        data: { name: name },
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
  async delete(@Param('id') id: number): Promise<Role> {
    try {
      const data = await prisma.role.delete({
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
