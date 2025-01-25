import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { CreatePostDto, UpdatePostDto } from '@project/blog-post';

@Controller('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Get('/:id')
  public async get(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Query('userId') userId: string,
    @Body() dto: UpdatePostDto
  ) {
    console.dir(dto);
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}?userId=${userId}`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete('/:id')
  public async remove(
    @Param('id') id: string,
    @Query('userId') userId: string
  ) {
    console.log('userId=',userId);
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}?userId=${userId}`);
    return data;
  }
}