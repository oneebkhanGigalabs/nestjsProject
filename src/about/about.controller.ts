import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDTO } from './dto/about.dto';

// get all: localhost:3000/about
// create: localhost:3000/about/create    #add the body for the object to be added
// get one: localhost:3000/about/api/?id=<the id>
// delete one: localhost:3000/about/api/?id=<the id>
// update one: localhost:3000/about/api/?id=<your id>  #you have to write the updated body

@Controller('about')
export class AboutController {
  constructor(private readonly AboutService: AboutService) {}

  @Get()
  async findAll() {
    const lists = await this.AboutService.finalAll();
    return lists;
  }

  @Post('/create')
  async addCustomer(@Body() CreateAboutDTO: CreateAboutDTO) {
    const lists = await this.AboutService.create(CreateAboutDTO);
    return { res: 200, msg: 'Succesfully created' };
  }

  @Get('/:id')
  async findOne(@Query('id') id: string) {
    const lists = await this.AboutService.findOne(id);
    if (!lists) {
      throw new NotFoundException("Can't find the item");
    }
    return lists;
  }

  @Put('/:id')
  async update(
    @Query('id') id: string,
    @Body() CreateAboutDTO: CreateAboutDTO,
  ) {
    const lists = await this.AboutService.update(id, CreateAboutDTO);
    if (!lists) {
      throw new NotFoundException('item not found');
    }
    return { res: 200, msg: 'Item updated successfully' };
  }

  @Delete('/:id')
  async delete(@Query('id') id: string) {
    const lists = await this.AboutService.delete(id);
    if (!lists) {
      throw new NotFoundException('Item with id not found');
    }
    return { res: 200, msg: 'item deleted successfully' };
  }
}
