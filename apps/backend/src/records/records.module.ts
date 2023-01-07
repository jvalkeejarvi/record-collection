import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsResolver } from './records.resolver';
import { RecordsService } from './records.service';

@Module({
  controllers: [RecordsController],
  providers: [RecordsService, RecordsResolver],
})
export class RecordsModule {}
