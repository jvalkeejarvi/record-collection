import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { renderWithProviders } from '../../utils/test-utils';
import CreateRecord from '../CreateRecord/CreateRecord';

describe('CreateRecord', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<CreateRecord />);
    expect(baseElement).toBeTruthy();
  });

  it('should have button disabled when input is empty', () => {
    const { getByRole } = renderWithProviders(<CreateRecord />);
    expect(getByRole('button')).toBeDisabled();
  });

  it('should enable button when input is not empty', () => {
    const { getByRole } = renderWithProviders(<CreateRecord />);

    act(() => {
      const input = document.querySelector('#new-record-name');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fireEvent.change(input!, { target: { value: 'abc' } });
    });

    expect(getByRole('button')).toBeEnabled();
  });

  it('should set value to empty when new item is created', () => {
    const { getByRole } = renderWithProviders(<CreateRecord />);

    const input = document.querySelector('#new-record-name');

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      fireEvent.change(input!, { target: { value: 'abc' } });

      getByRole('button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(input).toHaveValue('');
  });
});
