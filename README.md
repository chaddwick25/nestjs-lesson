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
