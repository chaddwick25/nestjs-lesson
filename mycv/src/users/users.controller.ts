import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  // UseInterceptors,
  UseGuards,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { setEmitFlags } from 'typescript';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

// locally scoped CurrentUserInceptor registers with the UserController
// import { CurrentUserInceptor } from './interceptors/current-user.inceptor';

@Controller('auth')
@Serialize(UserDto)
// locally scoped interceptors
// @UseInterceptors(CurrentUserInceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  // @Get('/whoami')
  // implements middleware gaurd around protected url 
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }
  // implements middleware gaurd around protected url 
  
  @UseGuards(AuthGuard)
  @Get('/whoami')
  // CurrentUser is a like a decorator-helper function of a hook 
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session:any){
    session.userId = null;

  }

  // @Serialize(SignupDto) specific Dto for each route on the request hanler
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // this.authService.signin(body.email, body.password);
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    //throw http specific error
    // other error types includes grpc or a websocket
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  // @Serialize(ExampleDto) specific Dto for each route on the request hanler
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    // passes the id to remove method linked to the user typeORM
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
