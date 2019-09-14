import { Injectable } from '@nestjs/common';
import config from '../auth.config.json';

@Injectable()
export class AuthService {
    validate(payload: any) {
        return payload.username === config.username || payload.password === config.password;
    }
}
