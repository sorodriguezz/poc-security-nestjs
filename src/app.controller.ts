import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { LogMethod, RolesTest } from './decorators/roles-test.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /*
    Lo declara para un rol especifico
  */
  @Roles('ATC')
  @Get()
  @LogMethod('aa')
  @RolesTest()
  getHello1(): string {
    return this.appService.getHello();
  }

  /*
    Para declarar rutas publicas
  */
  @Public()
  @Get('hello2')
  getHello2(): string {
    return this.appService.getHello();
  }

  /*
    Usa el AuthGuard para autenticar al usuario (quitando el guard global)
  */
  @UseGuards(AuthGuard())
  @Get('hello3')
  @SetMetadata('roles', ['ATC']) // agrega metadata a la ruta
  getHello3(): string {
    return this.appService.getHello();
  }
}
