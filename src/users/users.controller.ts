import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('users')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, description: 'Ok' })
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiTags('users')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Get single user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'Ok' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
