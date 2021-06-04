import { Field, Int, InputType } from '@nestjs/graphql';

@InputType()
export class InputFilm {
  @Field()
  readonly name: string;
  @Field()
  readonly watched: boolean;
  @Field()
  readonly genre: string;
  @Field(() => Int, { nullable: true })
  readonly rate?: number;
}
