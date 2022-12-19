import type { DataGridProps } from '@mui/x-data-grid';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { recordsService } from '../../app/recordApi';

import { recordsAdapter, RecordsState } from '../../app/recordSlice';
import { renderWithProviders } from '../../utils/test-utils';
import RecordList from '../RecordList/RecordList';

jest.mock('../../app/recordApi.ts', () => ({
  recordsService: {
    deleteRecord: () => Promise.resolve()
  }
}));

jest.mock('@mui/x-data-grid', () => {
  const { DataGrid } = jest.requireActual('@mui/x-data-grid');
  return {
    ...jest.requireActual('@mui/x-data-grid'),
    DataGrid: (props: DataGridProps) => (
      // Mock some DataGrid props or it won't work in tests
      <DataGrid
        {...props}
        disableVirtualization
        autoPageSize={false}
      />
    ),
  };
});

function renderWithRoutes() {
  let initialState: RecordsState = recordsAdapter.getInitialState({
    loadingStatus: 'loaded',
    pageNumber: 0,
    recordsOnDeletion: {},
    error: null
  });

  initialState = recordsAdapter.setAll(initialState, {
    5: { id: 5, name: 'Test Record 1', artist: 'Test Artist' },
    18: { id: 18, name: 'Test Record 2', artist: 'Other Artist' },
  });

  return renderWithProviders(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<RecordList />} />
        <Route path=':id' element={<div>DETAIL STATE</div>} />
      </Routes>
    </MemoryRouter>, {
      preloadedState: {
        records: initialState
      }
    }
  );
}

describe('RecordList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render row for every record', () => {
    renderWithRoutes();

    // 2 records and header row
    expect(screen.getAllByRole('row')).toHaveLength(3);
  });

  it('should delete record from table', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    jest.spyOn(recordsService, 'deleteRecord');
    renderWithRoutes();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
    const deleteButton = within(rows[2]).getByRole('button');
    fireEvent.click(deleteButton);

    expect(recordsService.deleteRecord).toHaveBeenCalledWith(18);
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(2);
    });
  });

  it('should not delete record when cancel is pressed', async () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    jest.spyOn(recordsService, 'deleteRecord');
    renderWithRoutes();

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(3);
    const deleteButton = within(rows[2]).getByRole('button');
    fireEvent.click(deleteButton);

    expect(recordsService.deleteRecord).not.toHaveBeenCalled();
  });
});
