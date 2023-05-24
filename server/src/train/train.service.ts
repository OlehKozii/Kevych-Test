import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Train } from '../database/entities/train.entity';
import { TrainDto } from './dto/train.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TrainService {
  constructor(@Inject(DataSource) private dataSource: DataSource) {}
  async getTrains(id: number) {
    let criteria;
    criteria = id ? `id=${id}` : '1+1';
    const trains = await this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(Train, 'train')
      .where(criteria)
      .getRawMany();
    return trains.length > 1
      ? plainToInstance(Train, trains)
      : [plainToInstance(Train, trains[0])];
  }

  async createTrain(body: TrainDto) {
    if (
      await this.dataSource
        .createQueryBuilder()
        .select('*')
        .from(Train, 'train')
        .where({ num: body.num })
        .getRawOne()
    ) {
      throw new ConflictException('Such train already exists');
    }
    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(Train)
      .values(body)
      .execute();
    return new Train(body);
  }

  async updateTrain(id: number, train: Partial<TrainDto>) {
    if (!(await this.isTrainExists(id))) {
      throw new NotFoundException('No such train');
    }
    delete train.num;
    await this.dataSource
      .createQueryBuilder()
      .update(Train)
      .set(train)
      .where({ id })
      .execute();
    return new Train(
      await this.dataSource
        .createQueryBuilder()
        .select('*')
        .from(Train, 'train')
        .where({ id: id })
        .getRawOne(),
    );
  }

  async deleteTrain(id: number) {
    if (!(await this.isTrainExists(id))) {
      throw new NotFoundException('No such train');
    }
    return await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(Train)
      .where({ id })
      .execute();
  }

  async isTrainExists(id: number) {
    return await this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(Train, 'train')
      .where({ id: id })
      .getRawOne();
  }
}
