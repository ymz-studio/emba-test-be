import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AppService } from "./app.service";

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = req.query.token;
    if(token && this.appService.token && token === this.appService.token){
      return true
    }else {
      throw new UnauthorizedException();
    }
  }
}
