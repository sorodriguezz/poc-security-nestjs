import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
    Reflector es una clase de ayuda que se utiliza para recuperar metadatos de las clases, métodos y controladores en tu aplicación NestJS. Los metadatos son información adicional que puedes adjuntar a las clases y métodos utilizando decoradores.
  */
    const reflector = app.get(Reflector);

  /*
    El JwtAuthGuard es un guardia de autenticación que utiliza JSON Web Tokens (JWT) para autenticar a los usuarios. También utiliza el Reflector para verificar si una ruta es pública o requiere autenticación. Si la ruta es pública, se permite el acceso sin autenticación. De lo contrario, se utiliza el guardia de autenticación de JWT proporcionado por NestJS para verificar la validez del token JWT. Si el token es válido y se encuentra un usuario asociado, se permite el acceso a la ruta. De lo contrario, se lanza una excepción de UnauthorizedException.
  */
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  /*
    Estos guards se aplicarán a todas las rutas de la aplicación.
    El RolesGuard es responsable de verificar si un usuario tiene los roles adecuados para acceder a una ruta específica. Utiliza el Reflector para obtener los roles definidos en los metadatos de la ruta y luego verifica si el usuario tiene alguno de esos roles. Si el usuario tiene los roles adecuados, se permite el acceso a la ruta. De lo contrario, se lanza una excepción de UnauthorizedException.
  */
  app.useGlobalGuards(new RolesGuard(reflector));


  await app.listen(3000);
}
bootstrap();
