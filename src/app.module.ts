import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AppService } from './app.service';
import { TokenGuard } from './token.guard';

@Global()
@Module({
  controllers: [AppController],
  imports: [AuthModule, AdminModule],
  providers: [AppService, TokenGuard],
  exports: [AppService]
})
export class AppModule { }
