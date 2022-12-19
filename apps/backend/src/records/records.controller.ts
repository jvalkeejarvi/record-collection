import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { CreateRecordDto } from './create-record-dto';
import { RecordDto } from './record-dto';
import { RecordsService } from './records.service';
import { UpdateRecordDto } from './update-recort-dto';

@ApiTags('records')
@Controller('records')
export class RecordsController {
  public constructor(private readonly recordsService: RecordsService) {}

  @Get()
  public getRecords(): RecordDto[] {
    return this.recordsService.getRecords();
  }

  @Get(':id')
  @ApiNotFoundResponse()
  public getRecord(@Param('id', ParseIntPipe) id: number): RecordDto {
    const record = this.recordsService.getRecordById(id);
    if (!record) {
      throw new NotFoundException();
    }
    return record;
  }

  @Post()
  public createRecord(@Body() record: CreateRecordDto): RecordDto {
    return this.recordsService.createRecord(record);
  }

  @Patch(':id')
  @ApiNotFoundResponse()
  public updateRecord(
    @Param('id', ParseIntPipe) id: number, @Body() updateData: UpdateRecordDto
  ): RecordDto {
    try {
      return this.recordsService.updateRecord(id, updateData);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNotFoundResponse()
  public deleteRecord(@Param('id', ParseIntPipe) id: number): void {
    try {
      this.recordsService.deleteRecord(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }
}
