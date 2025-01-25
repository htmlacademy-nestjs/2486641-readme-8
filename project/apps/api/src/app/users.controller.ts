import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseFilters, UseInterceptors } from '@nestjs/common';

import { CreateUserDto, LoginUserDto } from '@project/authentication';

import { ApplicationServiceURL } from './app.config';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { InjectUserIdInterceptor } from '@project/interceptors';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @UseInterceptors(InjectUserIdInterceptor)
  @Post('register')
  public async create(
    @Body() dto: CreateUserDto
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Users}/register`, dto);
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