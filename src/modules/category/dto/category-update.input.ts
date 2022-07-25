import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class CategoryUpdateInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @Length(3)
  name: string;

  @Field()
  @Length(3)
  slug: string;
}
