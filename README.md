# nestjs-lesson
NestJS: The Complete Developer's Guide

# Controllers

We can use the library-specific (e.g., Express) response object, which can be injected using the @Res() decorator in the method handler signature (e.g., findAll(@Res() response)). With this approach, you have the ability to use the native response handling methods exposed by that object. For example, with Express, you can construct responses using code like response.status(200).send().


When you inject either @Res() or @Response() in a method handler, you put Nest into Library-specific mode for that handler, and you become responsible for managing the response. When doing so, you must issue some kind of response by making a call on the response

# Cats Controller implementation 
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
# MUST install @types/express package
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}

# Route parameters 
@Get(':id')
findOne(@Param('id') id: string): string {
  return `This action returns a #${id} cat`;
}

# Sub-Domain Routing@Controller({ host: ':account.example.com' })
export class AccountController {
  @Get()
  getInfo(@HostParam('account') account: string) {
    return account;
  }
}

# gRPC Controller implementation
@Controller()
export class HeroesController {
# Nest encapsulates rpc method "findOne" in its wrapper 
# the rpc method(findOne) is then instanitated as "FindOne"
# "HeroesService", corresponding to the HeroesService service definition in hero.proto

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any>): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}

# Nest CLI
# the nest generate command integrates contollers and module that share the same namespace 
# the command below integrates the existing messages module by automatically importing the MessagesController  into the MessagesModule once the command below is executed, --flat for no parent contoller being created
nest generate controller messages/messages --flat


# Managing Dependencies as Interfaces
# 1. Define a Interface for a service 
# 2. create a class variable of the  typed interface(Repository) 
# 3. Instantiate interface as method input variable in the constructor within the service 

interface Repository {
  findOne(id: string);
  findAll();
  create(content: string)
}

export class MeassagesService {
  messagesRepo: Repository;

  constructor(repo: Repository){
    this.messagesRepo = repo
  }
}

# Guards
# Instantiate the Guard as decorator 

export const CurrentUser = createParamDecorator(
# ExecutionContext normalizes the request type http, websocket, rpc 
    (data: any, context: ExecutionContext) =>{
        
    }
)

import { CurrentUser } from './decorators/current-user.decorator';

# Locally scoped interceptors
# import the relevant inceptor
 import { CurrentUserInceptor } from './interceptors/current-user.inceptor';


# interceptor being applied to the UserControlller locally
@UseInterceptors(CurrentUserInceptor)
export class UsersController {

# Global Inceptors are applied via APP_INCEPTOR in the users module
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService, 
    AuthService, 
    CurrentUserInceptor,
# Globally scoped interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInceptor
    }
  ],
})

#  implements middleware gaurd around protected url 
  whoAmI(@CurrentUser() session: any) {
    return this.usersService.findOne(session.userId);
  }

### Typescript ###

# Removing the any type Annotation
const json = {"x":10, "y": 20 }
const coordinates: {x: number; y: number;} = JSON.parse(json)


# Delayed initialization Annotation
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let 1 = 0; i < words.length; i++){
  if(words[i] === 'green'){
    foundWord = true;
  }
}

# Optional type inference with default value Annotation
let numbers = [-10, -1, 12]
let numberAboveZero: boolean | number = false;

for ( let i = 0; i < numbers.length;  i++){
  if(numbers[i] > 0 ){
    numberAboveZero = numbers[i];
  }
}

# Classes 
class Car {}
let cat: Car = new Car()

# Object literal 
let point: { x: number; y: number; } = {
  x: 10,
  y: 10,
}

# Deconstruction with Annotations
const todayWeather = {
  date: new Date(),
  weather: 'sunny'
}

#  { destructoring } : { Annotations }
const logWeather =  ({date, weather}:{ date: Date, weather: string}): void  {
  console.log()
}

# Explicit destructoring 
const profile = {
  name: 'Chadd',
  age: 30, 
  coords: {
    lat: 0,
    lng: 15,
  }
  setAge(age : number):void {
    this.age = age;
  }
}

const { age }: { age: number} = profile

# Tuple 
# type alias annotations
type Drink = [string, boolean, number];

# implementations 
const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown' false, 0];


# Associations with Nest and TypeORM 

Figure out what kind assocaiation we are modeling 
Add the appropropriate decorators to our related entities 
Associate the records when one is created 
Apply a serializer to limit info shared 

* Guards cannot use interceptors only middleware 
 
