import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  public async greetings(): Promise<any> {
    return 'Welcome!';
  }
}
