import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { BlogPostQuery, UpdatePostDto, CreatePostDto as CreateBlogPostDto, BlogPostRdo, BlogPostWithPaginationRdo } from '@project/blog-post';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserId } from './decorators/user-id.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogCommentRdo, BlogCommentWithPaginationRdo, CreateCommentDto } from '@project/blog-comment';
import { PostListRdo } from './rdo/post-list.rdo';
import { AppService } from './app.service';

@Controller('blog/posts/')
@UseFilters(AxiosExceptionFilter)
export class BlogController {

  constructor(
    private readonly httpService: HttpService,
    private readonly appService: AppService,
  ) { }

  @Get('/search')
  @ApiOperation({ summary: 'Поиск публикаций.' })
  @ApiResponse({ status: HttpStatus.OK, type: [BlogPostRdo] })
  public async search(@Query('title') searchString: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/search`, { params: { title: searchString } });
    return data;
  }

  @Get('/drafts')
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получение списка своих черновиков.' })
  @ApiResponse({ status: HttpStatus.OK, type: [BlogPostRdo] })
  public async getDrafts(@UserId() userId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/drafts`, { params: { userId } });
    return data;
  }

  @Get('/')
  @ApiOperation({ summary: 'Получение списка публикаций.' })
  @ApiResponse({ status: HttpStatus.OK, type: PostListRdo })
  public async getAll(@Query() params: BlogPostQuery) {
    const postsWithPagination: BlogPostWithPaginationRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/`, { params })).data;
    await this.appService.appendUser(postsWithPagination.entities);
    return postsWithPagination;
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Просмотр детальной информации о публикации.' })
  @ApiResponse({ status: HttpStatus.OK, type: BlogPostRdo })
  public async get(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${id}`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создание новой публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogPostRdo })
  @Post('/')
  public async create(
    @Body() dto: CreatePostDto,
    @UserId() userId: string
  ) {
    const postData: CreateBlogPostDto = { ...dto, userId };
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, postData);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Редактирование публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED })
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
  @ApiOperation({ summary: 'Удаление публикации.' })
  @ApiResponse({ status: HttpStatus.OK })
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
  @ApiOperation({ summary: 'Репост публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogPostRdo })
  @Post('/:id/repost')
  public async repost(
    @Param('id') postId: string,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${postId}/repost`, {}, { params: { userId } });
    return data;
  }

  @Get('/send')
  @ApiOperation({ summary: 'Отправка уведомлений о новых публикациях.' })
  @ApiResponse({ status: HttpStatus.OK })
  public async send() {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/send`);
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Поставить лайк публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Like created' })
  @Post('/:id/likes')
  public async createLike(
    @Param('id') postId: string,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${postId}/likes`, {}, { params: { userId: userId } });
    return data;
  }

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Убрать лайк у публикации.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Like deleted' })
  @Delete('/:id/likes')
  public async deleteLike(
    @Param('id') postId: string,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/${postId}/likes`, { params: { userId } });
    return data;
  }

  @Post('/:id/comments')
  @ApiOperation({ summary: 'Создать комментарий к публикации.' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BlogCommentRdo, description: 'Comment created' })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  public async createComment(
    @Param('id') postId: string,
    @Body() dto: CreateCommentDto
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/${postId}/comments`, dto);
    return data;
  }

  @Get('/:id/comments')
  @ApiOperation({ summary: 'Список комментариев к публикации.' })
  @ApiResponse({ status: HttpStatus.OK, type: BlogCommentWithPaginationRdo })
  public async findComments(@Param('id') postId: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blog}/${postId}/comments`);
    return data;
  }

  @Delete('/comments/:commentId')
  @ApiOperation({ summary: 'Удалить комментарий' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Comment deleted' })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @ApiBearerAuth()
  public async removeComment(
    @Param('commentId') id: string,
    @UserId() userId: string
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blog}/comments/${id}`, { params: { userId } });
    return data;
  }

}