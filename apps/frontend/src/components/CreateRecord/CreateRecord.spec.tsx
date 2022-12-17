/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

  it('should enable button only when all form fields have value', () => {
    const { getByRole } = renderWithProviders(<CreateRecord />);

    act(() => {
      const input = document.querySelector('#new-record-name');
      fireEvent.change(input!, { target: { value: 'abc' } });
    });

    expect(getByRole('button')).toBeDisabled();

    act(() => {
      const input = document.querySelector('#new-record-artist');
      fireEvent.change(input!, { target: { value: 'test artist' } });
    });

    expect(getByRole('button')).toBeEnabled();
  });

  describe('submit tests', () => {
    let recordNameInput: Element | null;
    let artistInput: Element | null;
    let button: Element;

    beforeEach(() => {
      const { getByRole } = renderWithProviders(<CreateRecord />);

      recordNameInput = document.querySelector('#new-record-name');
      artistInput = document.querySelector('#new-record-artist');
      button = getByRole('button');

      fireEvent.change(recordNameInput!, { target: { value: 'abc' } });
      fireEvent.change(artistInput!, { target: { value: 'test artist 1' } });

    });

    it('should set form to initial state when button is clicked', () => {
      act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(recordNameInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
      expect(button).toBeDisabled();
    });

    it('should set form to initial state when submitted', () => {
      act(() => {
        fireEvent.submit(artistInput!);
      });

      expect(recordNameInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
      expect(button).toBeDisabled();
    });
  });
});
