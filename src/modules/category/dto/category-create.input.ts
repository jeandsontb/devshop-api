import { Field, InputType } from '@nestjs/graphql';
import { Length, Validate } from 'class-validator';
import { CategorySlugIsUnique } from '../custom-validators/categorySlugIsUnique';

@InputType()
export class CategoryCreateInput {
  @Field()
  @Length(3)
  name: string;

  @Field()
  @Length(3)
  @Validate(CategorySlugIsUnique)
  slug: string;
}
