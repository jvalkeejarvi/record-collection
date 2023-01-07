import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { RecordDto } from './record-dto';
import { RecordsService } from './records.service';

@Resolver(() => RecordDto)
export class RecordsResolver {
  constructor(
    private recordsService: RecordsService
  ) {
  }

  @Query(returns => [RecordDto])
  public async records(): Promise<RecordDto[]> {
    return this.recordsService.getRecords();
  }

  @Query(() => RecordDto)
  public async record(
    @Args('id', { type: () => Int }) id: number
  ): Promise<RecordDto | undefined> {
    return this.recordsService.getRecordById(id);
  }
}
