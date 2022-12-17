import { RecordsClient } from '@record-collection/records-client';

const recordsClient = new RecordsClient({ BASE: 'http://localhost:3333' });
export const recordsService = recordsClient.records;
