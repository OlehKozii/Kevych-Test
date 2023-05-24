import { ApiProperty } from '@nestjs/swagger';
import { number, string } from 'joi';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import { IsTime } from '../../common/decorators/isTime';

export class TrainBaseDto {
  @ApiProperty({
    name: 'from',
    type: string,
    example: 'Zaporizhia',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  from: string;

  @ApiProperty({
    name: 'to',
    type: string,
    example: 'Lviv',
    required: true,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(16)
  to: string;

  @ApiProperty({
    name: 'departureTime',
    type: string,
    example: '14:00',
    required: true,
  })
  @IsTime()
  departureTime: string;

  @ApiProperty({
    name: 'arrivalTime',
    type: string,
    example: '17:00',
    required: true,
  })
  @IsTime()
  arrivalTime: string;
}

export class TrainDto extends TrainBaseDto {
  @ApiProperty({ name: 'num', type: number, example: '86', required: true })
  @IsInt()
  num: number;
}

export class TrainReturnDto extends TrainDto {
  @ApiProperty({
    name: 'id',
    type: number,
    example: 1,
  })
  @IsInt()
  id: number;
}
