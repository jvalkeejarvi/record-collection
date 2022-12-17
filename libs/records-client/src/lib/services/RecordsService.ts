/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRecordDto } from '../models/CreateRecordDto';
import type { RecordEntity } from '../models/RecordEntity';
import type { UpdateRecordDto } from '../models/UpdateRecordDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RecordsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * @returns RecordEntity
     * @throws ApiError
     */
    public getRecords(): CancelablePromise<Array<RecordEntity>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/records',
        });
    }

    /**
     * @param requestBody
     * @returns RecordEntity
     * @throws ApiError
     */
    public createRecord(
        requestBody: CreateRecordDto,
    ): CancelablePromise<RecordEntity> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/records',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public getRecord(
        id: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/records/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public updateRecord(
        id: number,
        requestBody: UpdateRecordDto,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/records/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public deleteRecord(
        id: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/records/{id}',
            path: {
                'id': id,
            },
        });
    }

}
