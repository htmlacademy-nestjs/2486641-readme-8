import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { BlogPostQuery, CreatePostDto, UpdatePostDto } from '@project/blog-post';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserId } from './decorators/user-id.decorator';

@Controller('blog/posts/')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  @Get('/')
  public async getAll(@Query() params: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, { params });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @Get('/:id')
  public async get(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @Post('/')
  public async create(
    @Body() dto: CreatePostDto,
    @UserId() userId: string
  ) {
    dto.userId = userId;
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() dto: UpdatePostDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blog}/${id}`, dto, { params: { userId } });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @Delete('/:id')
  public async remove(
    @Param('id') id: string,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${id}`, { params: { userId } });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @Post('/:id/likes')
  public async createLike(
    @Param('id') id: string,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${id}/likes`, { params: { userId } });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @Delete('/:id/likes/:likeId')
  public async deleteLike(
    @Param() params,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${params.id}/likes/${params.likeId}`, { params: { userId } });
    return data;
  }
}