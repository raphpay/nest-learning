import { Injectable } from '@nestjs/common';
// import { CreateHelloDto } from './dto/create-hello.dto';
// import { UpdateHelloDto } from './dto/update-hello.dto';

@Injectable()
export class HelloService {
  getHello(): string {
    return '🙋‍♂️ Hello from Service';
  }
  // create(createHelloDto: CreateHelloDto) {
  // return 'This action adds a new hello';
  // }
  // findAll() {
  //   return `This action returns all hellos`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #id hello`;
  // }
  // update(id: number, updateHelloDto: UpdateHelloDto) {
  //   return `This action updates a #id hello`;
  // }
  // remove(id: number) {
  //   return `This action removes a #id hello`;
  // }
}
