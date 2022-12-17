import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateRecordDto } from './create-record-dto';
import { RecordEntity } from './record-dto';
import { RecordsService } from './records.service';
import { UpdateRecordDto } from './update-recort-dto';

@ApiTags('records')
@Controller('records')
export class RecordsController {
  public constructor(private readonly recordsService: RecordsService) {}

  @Get()
  public getRecords(): RecordEntity[] {
    return this.recordsService.getRecords();
  }

  @Get(':id')
  public getRecord(@Param('id', ParseIntPipe) id: number): RecordEntity | void {
    return this.recordsService.getRecordById(id);
  }

  @Post()
  public createRecord(@Body() record: CreateRecordDto): RecordEntity {
    return this.recordsService.createRecord(record);
  }

  @Patch(':id')
  public updateRecord(
    @Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateRecordDto
  ): RecordEntity | void {
    return this.recordsService.updateRecord(id, updateData);
  }

  @Delete(':id')
  public deleteRecord(@Param('id', ParseIntPipe) id: number): void {
    return this.recordsService.deleteRecord(id);
  }
}
