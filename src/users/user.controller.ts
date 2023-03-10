import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/findAll')
  findAll() {
    return this.userService.findAll();
  }

  @Get('/findOne/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  add(@Body() userDto: UserDto) {
    return this.userService.add(userDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.update(id, userDto);
  }
}
