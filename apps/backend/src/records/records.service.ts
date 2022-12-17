import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './create-record-dto';
import { RecordEntity } from './record-dto';
import { UpdateRecordDto } from './update-recort-dto';

@Injectable()
export class RecordsService {
  private records: RecordEntity[] = [
    { id: 1, name: 'Can\'t Buy A Thrill' },
    { id: 2, name: 'Countdown To Ecstacy' },
    { id: 3, name: 'Pretzel Logic' },
    { id: 4, name: 'Katy Lied' },
    { id: 5, name: 'The Royal Scam' },
    { id: 6, name: 'Aja' },
    { id: 7, name: 'Gaucho' },
    { id: 8, name: 'Two Against Nature' },
  ];

  public getRecords(): RecordEntity[] {
    return this.records;
  }

  public getRecordById(id: number): RecordEntity | void {
    const product = this.records.find(r => r.id === id);
    if (!product) {
      throw new NotFoundException('Could not find record');
    }
    return product;
  }

  public createRecord(record: CreateRecordDto): RecordEntity {
    const newRecord = {
      id: new Date().getTime(),
      ...record,
    };
    this.records.push(newRecord);
    return newRecord;
  }

  public deleteRecord(id: number): void {
    this.records = this.records.filter(r => r.id !== id);
  }

  public updateRecord(id: number, data: UpdateRecordDto): RecordEntity | void {
    const productIndex = this.records.findIndex(r => r.id === id);
    if (id < 0) {
      throw new NotFoundException('Could not find record');
    }
    const originalProduct = this.records[productIndex];
    this.records[productIndex] = {
      ...originalProduct,
      ...data
    };
    return this.records[productIndex];
  }
}
