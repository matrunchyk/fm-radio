import { Controller, Param, Post } from '@nestjs/common';
import { AppService, StationInfo } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('switch-freq/:frequency')
  switchFreq(@Param('frequency') frequency: number): Promise<StationInfo> {
    return this.appService.switchFreq(frequency);
  }

  @Post('stop')
  stop() {
    return this.appService.stop();
  }
}
