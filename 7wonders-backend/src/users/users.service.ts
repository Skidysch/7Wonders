import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: {
        ...createUserDto,
        statistics: {
          create: {},
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.databaseService.user.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          statistics: true,
        },
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    try {
      return await this.databaseService.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.databaseService.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }
}
