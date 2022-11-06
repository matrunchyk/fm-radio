import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configuration.js';

const configService = new ConfigService(configuration());
const app = await NestFactory.create(AppModule);
await app.listen(Number(configService.get('port')));
