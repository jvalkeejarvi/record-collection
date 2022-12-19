import { fireEvent, screen } from '@testing-library/react';

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
    renderWithProviders(<DeleteRecord id={3} onDelete={mockDelete} />);

    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    fireEvent.click(button);

    expect(mockDelete).toHaveBeenCalledWith(3);
    expect(screen.queryByText('LOADING')).not.toBeInTheDocument();
  });

  it('should disable button and show progress spinner while deleting', () => {
    const initialState: RecordsState = recordsAdapter.getInitialState({
      loadingStatus: 'loaded',
      pageNumber: 0,
      recordsOnDeletion: { 3: true },
      error: null
    });
    renderWithProviders(
      <DeleteRecord id={3} onDelete={jest.fn()} />,
      {
        preloadedState: {
          [RECORDS_FEATURE_KEY]: initialState
        }
      }
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });
});
