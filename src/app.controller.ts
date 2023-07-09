import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Test authorization request')
  @ApiOperation({ summary: 'Test authorization request' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
