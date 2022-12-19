import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { recordsAdapter, RecordsState, RECORDS_FEATURE_KEY } from '../../app/recordSlice';
import { renderWithProviders } from '../../utils/test-utils';
import RecordDetail from '../RecordDetail/RecordDetail';

jest.mock('@mui/material', () => {
  const lib = jest.requireActual('@mui/material');

  return {
    ...lib,
    CircularProgress: () => (<>LOADING</>),
  };
});

function renderWithState(state: RecordsState) {
  return renderWithProviders(
    <MemoryRouter initialEntries={['/18']}>
      <Routes>
        <Route path='/' element={<div>BACK TO LIST</div>} />
        <Route path='/:id' element={<RecordDetail />} />
      </Routes>
    </MemoryRouter>,
    {
      preloadedState: {
        [RECORDS_FEATURE_KEY]: state
      }
    }
  );
}

describe('RecordDetail', () => {
  let emptyState: RecordsState;
  let initialState: RecordsState;

  beforeEach(() => {
    emptyState = recordsAdapter.getInitialState({
      loadingStatus: 'loaded',
      pageNumber: 0,
      recordsOnDeletion: {},
      error: null
    });

    initialState = recordsAdapter.setAll(emptyState, {
      5: { id: 5, name: 'asdf', artist: 'asdf' },
      18: { id: 18, name: 'bb', artist: 'cc' },
    });
  });

  it('should go back to list', () => {
    renderWithState(initialState);
    const goHomeLink = screen.getByRole('link');
    fireEvent.click(goHomeLink);

    expect(screen.getByText('BACK TO LIST')).toBeInTheDocument();
  });

  it('should render successfully', () => {
    renderWithState(initialState);
    expect(screen.queryByText('Record not found')).not.toBeInTheDocument();
  });

  it('should render loading spinner', () => {
    renderWithState({ ...emptyState, loadingStatus: 'loading' });
    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });

  it('should show message when record is not found', () => {
    renderWithState(emptyState);
    expect(screen.getByText('Record not found')).toBeInTheDocument();
  });
});
