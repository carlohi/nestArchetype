import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [CatsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33061,
      username: 'root',
      password: 'secret',
      database: 'cats',
      autoLoadEntities:true,
      synchronize: true,
    }),],
  controllers: [AppController, CatsController],
  providers: [AppService],
})
export class AppModule {}
