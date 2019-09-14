import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
    data: any[] = []
    token: string = ''
    dataSubject: Subject<any> = new Subject()
}
