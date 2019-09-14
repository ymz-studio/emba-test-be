import { Controller, Body, Post, Session, UnprocessableEntityException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post()
    login(@Body() payload, @Session() session) {
        if (this.authService.validate(payload)) {
            session.auth = payload
        } else {
            throw new UnprocessableEntityException('用户名或密码错误');
        }
    }
}
