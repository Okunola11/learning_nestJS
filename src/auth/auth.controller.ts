import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtInterface } from './types/jwt.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './get-user.decorator';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiBody({
    type: LoginUserDto,
    examples: {
      example: {
        value: {
          email: 'example@mailcom',
          password: '123455',
        },
      },
    },
  })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('signup')
  @ApiTags('auth')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Created' })
  async signUp(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.signUp(createUserDto);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@GetUser() user: JwtInterface) {
    return user;
  }
}
