/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateRecordDto } from '@record-collection/records-client';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { recordsAdapter, RecordsState, RECORDS_FEATURE_KEY } from '../../app/recordSlice';
import { AppStore } from '../../store';

import { renderWithProviders } from '../../utils/test-utils';
import CreateRecord from '../CreateRecord/CreateRecord';

jest.mock('../../app/recordApi.ts', () => ({
  recordsService: {
    createRecord: (newRecord: CreateRecordDto) => Promise.resolve({
      ...newRecord,
      id: 10
    })
  }
}));

describe('CreateRecord', () => {
  let recordNameInput: Element | null;
  let artistInput: Element | null;
  let button: Element;
  let store: AppStore;

  const setup = () => {
    const initialState: RecordsState = recordsAdapter.getInitialState({
      loadingStatus: 'loaded',
      pageNumber: 0,
      recordsOnDeletion: {},
      error: null,
      entities: {
        8: { id: 8, name: 'Test record 8', artist: 'Test Artist' },
        9: { id: 9, name: 'Test record 9', artist: 'Test Artist 2' },
      }
    });
    const { store } = renderWithProviders(
      <CreateRecord />,
      {
        preloadedState: {
          [RECORDS_FEATURE_KEY]: initialState
        }
      }
    );
    return store;
  };

  beforeEach(() => {
    store = setup();

    recordNameInput = screen.getByLabelText('name');
    artistInput = screen.getByLabelText('artist');
    button = screen.getByRole('button');

    fireEvent.change(recordNameInput, { target: { value: 'abc' } });
    fireEvent.change(artistInput, { target: { value: 'test artist 1' } });
  });

  it('should add newly created item to store', async () => {
    fireEvent.click(button);

    await waitFor(() => expect(store.getState().records.entities).toEqual({
      8: { id: 8, name: 'Test record 8', artist: 'Test Artist' },
      9: { id: 9, name: 'Test record 9', artist: 'Test Artist 2' },
      10: { id: 10, name: 'abc', artist: 'test artist 1' },
    }));
  });
});
