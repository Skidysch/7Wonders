import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    // Check if the user already exists by email or username
    const existingUser = await this.databaseService.user.findFirst({
      where: {
        OR: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      },
    });
    if (existingUser) {
      throw new ConflictException(
        'User with this email or username already exists',
      );
    }

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

  async findOneByUsername(username: string) {
    try {
      return await this.databaseService.user.findUniqueOrThrow({
        where: {
          username,
        },
        include: {
          statistics: true,
        },
      });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.databaseService.user.findUniqueOrThrow({
        where: {
          email,
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

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null,
  ): Promise<void> {
    await this.databaseService.user.update({
      where: {
        id: userId,
      },
      data: { refreshToken },
    });
  }
}
