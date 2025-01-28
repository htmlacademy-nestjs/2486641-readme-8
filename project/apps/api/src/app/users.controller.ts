import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthenticationResponseMessage, ChangePasswordDto, CreateUserDto, LoginUserDto, UserRdo } from '@project/authentication';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CheckAnonymousGuard } from './guards/check-anonymous.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { PaginationResult, Post as BlogPost } from '@project/core';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: AuthenticationResponseMessage.UserFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: AuthenticationResponseMessage.UserNotFound,
  })
  @Get(':id')
  public async getById(@Param('id') id: string): Promise<UserRdo> {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Users}/${id}`);
    const posts: PaginationResult<BlogPost> = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}`, { params: { userId: id } })).data;
    data['countPosts'] = posts.totalItems;
    data['countSubscribers'] = 0;
    return data;
  }

  @ApiBearerAuth()
  @UseGuards(CheckAnonymousGuard)
  @Post('register')
  public async create(
    @Body() dto: CreateUserDto
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
    return data;
  }

  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('change-password')
  public async changePassword(
    @Body() dto: ChangePasswordDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Users}/change-password`, dto);
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/login`, loginUserDto);
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });

    return data;
  }
}