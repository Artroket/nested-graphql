import { Film } from './../interfaces/film.interface';
import { ObjectType, Field, Int, ID, createUnionType } from '@nestjs/graphql';

@ObjectType()
export class CreateFilmDto {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly watched: boolean;

  @Field()
  readonly genre: string;

  @Field(() => Int, { nullable: true })
  readonly rate?: number;
}

@ObjectType()
export class meta {
  @Field(() => Int)
  readonly count: number;
  @Field(() => Int)
  readonly pageSize: number;
  @Field(() => Int)
  readonly page: number;
}

@ObjectType()
export class FilmsResponse {
  @Field(() => [CreateFilmDto])
  readonly data: CreateFilmDto[];
  @Field(() => meta)
  readonly meta: meta;
}
