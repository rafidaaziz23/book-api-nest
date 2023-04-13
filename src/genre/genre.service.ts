import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Genre } from '@prisma/client';
import { CreateGenreDto, UpdateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}
  async create(genreData: CreateGenreDto): Promise<Genre> {
    const { name } = genreData;
    return this.prisma.genre.create({
      data: {
        name: name,
      },
    });
  }

  async findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number): Promise<Genre | null> {
    return this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });
  }

  async update(id: number, data: UpdateGenreDto): Promise<Genre> {
    return this.prisma.genre.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Genre> {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
}
