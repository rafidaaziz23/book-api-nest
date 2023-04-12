import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RoleController } from './role.controller';

@Module({
  controllers: [RoleController],
  providers: [PrismaService],
})
export class RoleModule {}
