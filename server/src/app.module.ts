import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import joi from './common/validation/env.validation';
import { TrainModule } from './train/train.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: joi,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mariadb',
          url: configService.get('MYSQL_URL'),
          synchronize: true,
          entities: [__dirname + '/database/entities/*{.js,.ts}'],
          logging: ['query', 'warn', 'error'],
        };
      },
      inject: [ConfigService],
    }),
    TrainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
