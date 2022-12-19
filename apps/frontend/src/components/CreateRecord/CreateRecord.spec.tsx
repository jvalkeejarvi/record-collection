/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateRecordDto } from '@record-collection/records-client';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { recordsService } from '../../app/recordApi';
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
  it('should have button disabled when input is empty', () => {
    renderWithProviders(<CreateRecord />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should enable button only when all form fields have value', () => {
    renderWithProviders(<CreateRecord />);

    const button = screen.getByRole('button');

    const nameInput = screen.getByLabelText('name');
    fireEvent.change(nameInput!, { target: { value: 'abc' } });

    expect(button).toBeDisabled();

    const artistInput = screen.getByLabelText('artist');
    fireEvent.change(artistInput!, { target: { value: 'test artist' } });

    expect(button).toBeEnabled();
  });

  it('should only add record when submit is enabled', () => {
    renderWithProviders(<CreateRecord />);
    jest.spyOn(recordsService, 'createRecord');

    const nameInput = screen.getByLabelText('name');
    const artistInput = screen.getByLabelText('artist');

    fireEvent.change(nameInput!, { target: { value: 'abc' } });
    fireEvent.submit(artistInput!);

    expect(recordsService.createRecord).not.toHaveBeenCalled();

    fireEvent.change(artistInput!, { target: { value: 'def' } });
    fireEvent.submit(artistInput!);

    expect(recordsService.createRecord).toHaveBeenCalled();
  });

  describe('submit tests', () => {
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

      fireEvent.change(recordNameInput!, { target: { value: 'abc' } });
      fireEvent.change(artistInput!, { target: { value: 'test artist 1' } });
    });

    it('should set form to initial state when button is clicked', () => {
      fireEvent.click(button);

      expect(recordNameInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
      expect(button).toBeDisabled();
    });

    it('should set form to initial state when submitted', () => {
      fireEvent.submit(artistInput!);

      expect(recordNameInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
      expect(button).toBeDisabled();
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
});
