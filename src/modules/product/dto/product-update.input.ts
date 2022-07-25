import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class ProductUpdateInput {
  @Field()
  @IsUUID()
  id: string;

  @Field()
  @Length(3)
  name: string;

  @Field()
  @Length(3)
  slug: string;

  @Field()
  @Length(5)
  description: string;

  @Field()
  @IsUUID()
  category: string;
}
