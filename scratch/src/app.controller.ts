import { Controller, Get } from "@nestjs/common";

// creating a namespace for routes  
// Using a path prefix in a @Controller() decorator allows us to easily group a set of related routes, and
// minimize repetitive code. 

@Controller('/app')
export class AppController {
    //route naming
    @Get('/asdf')
    getRootRoute(){
        return 'hi there';
    }

    @Get('/bye')
    getByeThere() {
        return 'bye there';
    }
}
