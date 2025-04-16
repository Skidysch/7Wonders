import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  async onModuleInit() {
    try {
      this.client = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      });

      // Test the connection
      await this.client.ping();
      console.log('Redis connected successfully');
    } catch (error) {
      console.error('Error connecting to Redis:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  getClient(): Redis {
    if (!this.client) {
      throw new Error('Redis client not initialized');
    }
    return this.client;
  }
}
