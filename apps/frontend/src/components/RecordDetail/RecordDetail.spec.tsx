import { act } from 'react-dom/test-utils';
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
      5: { id: 5, name: 'asdf', body: 'asdf', email: 'asdf' },
      18: { id: 18, name: 'bb', body: 'cc', email: 'dd' },
    });
  });

  it('should go back to list', () => {
    const { baseElement, getByRole } = renderWithState(initialState);

    act(() => {
      const goHomeLink = getByRole('link');
      goHomeLink?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(baseElement.textContent).toBe('BACK TO LIST');
  });

  it('should render successfully', () => {
    const { baseElement } = renderWithState(initialState);
    expect(baseElement.textContent).not.toContain('Record not found');
  });

  it('should render loading spinner', () => {
    const { baseElement } = renderWithState({ ...emptyState, loadingStatus: 'loading' });
    expect(baseElement.textContent).toContain('LOADING');
  });

  it('should show message when record is not found', () => {
    const { baseElement } = renderWithState(emptyState);
    expect(baseElement.textContent).toContain('Record not found');
  });
});
