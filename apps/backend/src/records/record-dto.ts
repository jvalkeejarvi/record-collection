import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecordDto {
  @Field(type => Int)
  public readonly id!: number;

  @Field()
  public readonly name!: string;

  @Field()
  public readonly artist!: string;
}
