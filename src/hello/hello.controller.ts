import { Controller, Get } from '@nestjs/common';
// import { CreateHelloDto } from './dto/create-hello.dto';
// import { UpdateHelloDto } from './dto/update-hello.dto';
import { HelloService } from './hello.service';

@Controller('hellos')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }

  // @Post()
  // create(@Body() createHelloDto: CreateHelloDto) {
  //   return this.helloService.create(createHelloDto);
  // }

  // @Get()
  // findAll() {
  //   return this.helloService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.helloService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHelloDto: UpdateHelloDto) {
  //   return this.helloService.update(+id, updateHelloDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.helloService.remove(+id);
  // }
}
