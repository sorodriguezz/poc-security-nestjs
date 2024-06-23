import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('canActivate - RolesGuard');
    try {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());

      if (!roles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();

      const token = req.headers['authorization']?.split(' ')[1];
      const decodedToken = jwt_decode(token) as any;
      let isInRole = false;

      if (decodedToken && decodedToken.authorities) {
        const authorities = JSON.parse(decodedToken.authorities);
        authorities.forEach((rolFromToken: any) => {
          if (roles.includes(rolFromToken.authority)) {
            isInRole = true;
          }
        });
      }

      if (isInRole) {
        Logger.log('verificacion de roles OK', 'Role Guard');
        return true;
      } else {
        throw Error(
          `Los roles del usuario no hacen match con los roles definidos para la ruta`,
        );
      }
    } catch (err) {
      Logger.error(err, 'RoleGuard');
      throw new UnauthorizedException();
    }
  }
}
