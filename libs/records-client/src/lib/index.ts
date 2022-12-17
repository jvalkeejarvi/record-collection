/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { RecordsClient } from './RecordsClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { CreateRecordDto } from './models/CreateRecordDto';
export type { RecordEntity } from './models/RecordEntity';
export type { UpdateRecordDto } from './models/UpdateRecordDto';

export { RecordsService } from './services/RecordsService';
