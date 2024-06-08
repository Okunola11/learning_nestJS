import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(signInUserDto: LoginUserDto) {
    const { email, password } = signInUserDto;
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Username or password is not valid');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return {
        name: user.name,
        username: user.username,
        email: user.email,
        id: user.id,
        ...this.createToken(user),
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async signUp(createUserDto: Prisma.UserCreateInput) {
    const { password, ...rest } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await this.usersService.create({
      ...rest,
      password: hashedPassword,
    });

    delete user.password;
    return { ...user, ...this.createToken(user) };
  }

  private createToken(user: Prisma.UserCreateInput & { id: number }) {
    const { email, id } = user;
    const payload = { email, id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
