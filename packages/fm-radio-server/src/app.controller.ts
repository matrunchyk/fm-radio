import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService, StationInfo } from './app.service.js';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Post('switch-freq/:frequency')
  switchFreq(@Param('frequency') frequency: number): Promise<StationInfo> {
    return this.appService.switchFreq(Number(frequency));
  }

  @Post('stop')
  stop() {
    return this.appService.stop();
  }

  @Get('stations')
  getStations(): Record<number, string> {
    return this.configService.get<Record<number, string>>('stations') || {};
  }
}
