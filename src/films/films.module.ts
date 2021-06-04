import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResolver } from './films.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmSchema } from './films.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Film', schema: FilmSchema }])],
  providers: [FilmsService, FilmsResolver],
})
export class FilmsModule {}
