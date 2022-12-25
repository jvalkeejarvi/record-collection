import { renderWithProviders } from '../../utils/test-utils';
import { recordsAdapter, RecordsState, RECORDS_FEATURE_KEY } from '../recordSlice';

import { fireEvent, screen, waitFor } from '@testing-library/react';

import RecordDetailContainer from './RecordDetailContainer';
import { UpdateRecordDto } from '@record-collection/records-client';
import { recordsService } from '../recordApi';

jest.mock('../../app/recordApi.ts', () => ({
  recordsService: {
    updateRecord: (id: number, changes: UpdateRecordDto) => Promise.resolve({
      id,
      ...changes,
    })
  }
}));

function setup() {
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
  return renderWithProviders(
    <RecordDetailContainer record={{ id: 8, name: 'Test record 8', artist: 'Test Artist' }} />,
    {
      preloadedState: {
        [RECORDS_FEATURE_KEY]: initialState
      }
    }
  );
};

describe('RecordDetailContainer', () => {
  it('should show record detail initially', () => {
    setup();

    expect(screen.getByText('Test record 8')).toBeInTheDocument();
    expect(screen.getByText('Test Artist')).toBeInTheDocument();
  });

  it('should enable and disable edit mode', () => {
    setup();

    expect(screen.queryByRole('input')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(screen.queryByRole('input')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });

  it('should edit record', async () => {
    const { store } = setup();
    jest.spyOn(recordsService, 'updateRecord');

    fireEvent.click(screen.getByRole('button', { name: /edit/i }));

    const nameInput = screen.getByRole('textbox', { name: 'name' });
    const artistInput = screen.getByRole('textbox', { name: 'artist' });

    fireEvent.change(nameInput, { target: { value: 'Edited record name' } });
    fireEvent.change(artistInput, { target: { value: 'Edited artist' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    expect(screen.queryByRole('input')).not.toBeInTheDocument();
    expect(recordsService.updateRecord).toHaveBeenCalledWith(
      8,
      { name: 'Edited record name', artist: 'Edited artist' }
    );
    await waitFor(() => expect(store.getState().records.entities).toEqual({
      8: { id: 8, name: 'Edited record name', artist: 'Edited artist' },
      9: { id: 9, name: 'Test record 9', artist: 'Test Artist 2' },
    }));
  });
});
