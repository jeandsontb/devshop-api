import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, Length, Matches, Validate } from 'class-validator';
import { BrandSlugIsUnique } from '../custom-validators/brandSlugIsUnique';

@InputType()
export class BrandUpdateInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @Length(3)
  name: string;

  @Field()
  @Length(3)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  @Validate(BrandSlugIsUnique)
  slug: string;
}
