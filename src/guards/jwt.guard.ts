import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );
    console.log('canActivate - JwtAuthGuard');

    // if para permitir el acceso a los mensajes de RabbitMQ
    if (context.getType().toString() === 'rmq') {
      return true;
    }

    // Trae metadata publica
    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info, context) {

    console.log('handleRequest - JwtAuthGuard');
    console.log(info);
    console.log(err);
    console.log(user);
    if (info) {
      Logger.error(info.message, info.name);
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
