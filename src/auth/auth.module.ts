import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
// import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [
    UserModule,
    TokensModule,
    // JwtModule.register({
    //   secret: process.env.PRIVATE_KEY || 'SECRET',
    //   signOptions: {
    //     expiresIn: '24h',
    //   },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // JwtModule
})
export class AuthModule {}
