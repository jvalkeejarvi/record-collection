import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  record: RecordDto;
  records: Array<RecordDto>;
};


export type QueryRecordArgs = {
  id: Scalars['Int'];
};

export type RecordDto = {
  __typename?: 'RecordDto';
  artist: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type GetRecordsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecordsQuery = { __typename?: 'Query', records: Array<{ __typename?: 'RecordDto', id: number, name: string, artist: string }> };

export type RecordFieldsFragment = { __typename?: 'RecordDto', id: number, name: string, artist: string };

export const RecordFieldsFragmentDoc = gql`
    fragment RecordFields on RecordDto {
  id
  name
  artist
}
    `;
export const GetRecordsDocument = gql`
    query getRecords {
  records {
    ...RecordFields
  }
}
    ${RecordFieldsFragmentDoc}`;

/**
 * __useGetRecordsQuery__
 *
 * To run a query within a React component, call `useGetRecordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecordsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecordsQuery, GetRecordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecordsQuery, GetRecordsQueryVariables>(GetRecordsDocument, options);
      }
export function useGetRecordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecordsQuery, GetRecordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecordsQuery, GetRecordsQueryVariables>(GetRecordsDocument, options);
        }
export type GetRecordsQueryHookResult = ReturnType<typeof useGetRecordsQuery>;
export type GetRecordsLazyQueryHookResult = ReturnType<typeof useGetRecordsLazyQuery>;
export type GetRecordsQueryResult = Apollo.QueryResult<GetRecordsQuery, GetRecordsQueryVariables>;