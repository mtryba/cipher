import { createParamDecorator } from '@nestjs/common';

export const Requester = createParamDecorator((data, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.requester;
});
