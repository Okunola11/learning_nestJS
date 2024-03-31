import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtInterface } from './types/jwt.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.signUp(createUserDto);
  }

  @Get('test')
  @UseGuards(AuthGuard())
  async test(@GetUser() user: JwtInterface) {
    return user;
  }
}
