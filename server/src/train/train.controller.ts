import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainBaseDto, TrainDto, TrainReturnDto } from './dto/train.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  PartialType,
} from '@nestjs/swagger';

@ApiTags('Train controller')
@Controller('')
export class TrainController {
  constructor(@Inject(TrainService) private trainService: TrainService) {}

  @ApiOperation({ summary: 'Get all trains' })
  @ApiResponse({ type: TrainReturnDto, isArray: true })
  @Get('')
  async getAllTrains() {
    return await this.trainService.getTrains(undefined);
  }

  @ApiOperation({ summary: 'Get specific train' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: TrainReturnDto })
  @Get(':id')
  async getTrain(@Param('id') id: number) {
    return await this.trainService.getTrains(id);
  }

  @ApiOperation({ summary: 'Create train' })
  @ApiBody({ type: TrainDto, required: true })
  @ApiResponse({ type: TrainReturnDto })
  @Post()
  @HttpCode(200)
  async createTrain(@Body() body: TrainDto) {
    return await this.trainService.createTrain(body);
  }

  @ApiOperation({ summary: 'Update train' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: PartialType(TrainBaseDto) })
  @ApiResponse({ type: TrainReturnDto })
  @Put(':id')
  async editTrain(
    @Param('id') id: number,
    @Body() body: Partial<TrainBaseDto>,
  ) {
    return await this.trainService.updateTrain(id, body);
  }

  @ApiOperation({ summary: 'Delete train' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: null })
  @Delete(':id')
  async deleteTrain(@Param('id') id: number) {
    return await this.trainService.deleteTrain(id);
  }
}
