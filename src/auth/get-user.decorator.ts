import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  return user;
});
