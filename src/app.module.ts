import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';

@Global()
@Module({
  controllers: [AppController],
  imports: [AuthModule, AdminModule],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
