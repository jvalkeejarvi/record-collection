import '@testing-library/jest-dom';
import { act } from '@testing-library/react';

import { recordsAdapter, RecordsState, RECORDS_FEATURE_KEY } from '../../app/recordSlice';
import { renderWithProviders } from '../../utils/test-utils';
import DeleteRecord from '../DeleteRecord/DeleteRecord';

jest.mock('@mui/material', () => {
  const lib = jest.requireActual('@mui/material');

  return {
    ...lib,
    CircularProgress: () => (<>LOADING</>),
  };
});

describe('DeleteRecord', () => {
  it('should use delete callback on button click', () => {
    const mockDelete = jest.fn();
    const { baseElement, getByRole } = renderWithProviders(<DeleteRecord id={3} onDelete={mockDelete} />);

    act(() => {
      const button = getByRole('button');
      expect(button).toBeEnabled();
      button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(mockDelete).toHaveBeenCalledWith(3);
    expect(baseElement.textContent).not.toContain('LOADING');
  });

  it('should disable button and show progress spinner while deleting', () => {
    const initialState: RecordsState = recordsAdapter.getInitialState({
      loadingStatus: 'loaded',
      pageNumber: 0,
      recordsOnDeletion: { 3: true },
      error: null
    });
    const { baseElement, getByRole } = renderWithProviders(
      <DeleteRecord id={3} onDelete={jest.fn()} />,
      {
        preloadedState: {
          [RECORDS_FEATURE_KEY]: initialState
        }
      }
    );

    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(baseElement.textContent).toContain('LOADING');
  });
});
