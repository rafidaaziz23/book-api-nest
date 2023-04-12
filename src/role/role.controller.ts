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

const prisma = new PrismaClient();

@Controller('role')
export class RoleController {
  @Get()
  async findAll(): Promise<Role[]> {
    const data = await prisma.role.findMany();
    return data;
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
  async create(@Body() roleData: { name: string }): Promise<Role> {
    const { name } = roleData;
    return await prisma.role.create({
      data: {
        name: name,
      },
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() roleData: { name: string },
  ): Promise<Role> {
    const { name } = roleData;
    return await prisma.role.update({
      where: { id: Number(id) },
      data: { name: name },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Role> {
    return await prisma.role.delete({
      where: { id: Number(id) },
    });
  }
}
