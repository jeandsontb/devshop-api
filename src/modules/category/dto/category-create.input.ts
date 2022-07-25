import { Field, InputType } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class CategoryCreateInput {
  @Field()
  @Length(3)
  name: string;

  @Field()
  @Length(3)
  slug: string;
}
