import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/common/enums/role.enum';
import { User } from 'src/modules/auth/entities/user.entity';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (user && user.haveRoles([RoleEnum.USER])) return true;

    return false;
  }
}
