import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AtStrategy, RtStrategy } from './strategies';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [UsersModule, TokensModule],
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
