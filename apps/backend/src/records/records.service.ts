import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './create-record-dto';
import { RecordDto } from './record-dto';
import { UpdateRecordDto } from './update-recort-dto';

@Injectable()
export class RecordsService {
  private records: RecordDto[] = [
    { id: 1, name: 'Can\'t Buy A Thrill', artist: 'Steely Dan' },
    { id: 2, name: 'Countdown To Ecstacy', artist: 'Steely Dan' },
    { id: 3, name: 'Pretzel Logic', artist: 'Steely Dan' },
    { id: 4, name: 'Katy Lied', artist: 'Steely Dan' },
    { id: 5, name: 'The Royal Scam', artist: 'Steely Dan' },
    { id: 6, name: 'Aja', artist: 'Steely Dan' },
    { id: 7, name: 'Gaucho', artist: 'Steely Dan' },
    { id: 8, name: 'Two Against Nature', artist: 'Steely Dan' },
    { id: 10, name: 'Homework', artist: 'Daft Punk' },
    { id: 11, name: 'Discovery', artist: 'Daft Punk' },
    { id: 12, name: 'Human After All', artist: 'Daft Punk' },
    { id: 13, name: 'Random Access Memories', artist: 'Daft Punk' },
    { id: 13, name: 'The Nightfly', artist: 'Donald Fagen' },
    { id: 14, name: 'Kamakiriad', artist: 'Donald Fagen' },
    { id: 15, name: 'Morph the Cat', artist: 'Donald Fagen' },
    { id: 16, name: 'Sunken Condos', artist: 'Donald Fagen' },
  ];

  public getRecords(): RecordDto[] {
    return this.records;
  }

  public getRecordById(id: number): RecordDto | void {
    const product = this.records.find(r => r.id === id);
    if (!product) {
      throw new NotFoundException('Could not find record');
    }
    return product;
  }

  public createRecord(record: CreateRecordDto): RecordDto {
    const maxId = Math.max(...this.records.map(r => r.id));
    const newRecord = {
      id: maxId + 1,
      ...record,
    };
    this.records.push(newRecord);
    return newRecord;
  }

  public deleteRecord(id: number): void {
    this.records = this.records.filter(r => r.id !== id);
  }

  public updateRecord(id: number, data: UpdateRecordDto): RecordDto | void {
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
