import { CreateFilmDto, FilmsResponse } from './dto/create-film.dto';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
  Int,
} from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { InputFilm } from './inputs/film.input';
import { PubSub } from 'graphql-subscriptions';

@Resolver((of) => CreateFilmDto)
export class FilmsResolver {
  private pubSub: PubSub;

  constructor(private readonly filmsService: FilmsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => FilmsResponse)
  async films(
    @Args({ type: () => Int, name: 'offset' }) offset: number,
    @Args({ type: () => Int, name: 'limit' }) limit: number,
  ) {
    const data = await this.filmsService.getPage(offset, limit);
    const meta = {
      count: await this.filmsService.countAll(),
      page: offset / limit,
      pageSize: limit,
    };
    return { data, meta };
  }

  @Query((returns) => String)
  async user() {
    return 'Artem';
  }

  @Query((returns) => Number)
  async numberOfFilms() {
    return this.filmsService.countAll();
  }

  @ResolveField('pRate', (returns) => String)
  async countPRate(@Parent() film: CreateFilmDto) {
    const { rate } = film;
    if (rate) {
      return `${rate * 10}%`;
    } else {
      return 'no info';
    }
  }

  @Mutation(() => CreateFilmDto)
  async createFilm(@Args('input') input: InputFilm) {
    const film = await this.filmsService.create(input);
    this.pubSub.publish('goodFilmAdded', { goodFilmAdded: film });
    return film;
  }

  @Subscription(() => CreateFilmDto, {
    nullable: true,
    filter: (payload, variables) =>
      payload.goodFilmAdded.rate === variables.rate,
  })
  goodFilmAdded(@Args({ type: () => Number, name: 'rate' }) rate: number) {
    return this.pubSub.asyncIterator('goodFilmAdded');
  }

  @Mutation(() => CreateFilmDto)
  async deleteFilm(@Args('name') name: string) {
    return this.filmsService.delete(name);
  }
}
