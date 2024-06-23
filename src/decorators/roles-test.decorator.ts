import { SetMetadata } from '@nestjs/common';

export const RolesTest = (...args: string[]) => SetMetadata('roles-test', args);


export const LogMethod = (...args: string[]): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    // console.log(target);
    // console.log(propertyKey);
    // console.log(descriptor);
    // console.log(args);
  };
}
