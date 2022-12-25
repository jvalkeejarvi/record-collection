/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CreateRecordDto } from '@record-collection/records-client';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../utils/test-utils';
import RecordInfoForm from '../RecordInfoForm/RecordInfoForm';

describe('RecordInfoForm', () => {
  let submitFn: (formValue: CreateRecordDto) => void;

  beforeEach(() => {
    submitFn = jest.fn();
  });

  it('should have button disabled when inputs are empty', () => {
    renderWithProviders(<RecordInfoForm onSubmit={submitFn} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have button enabled initially when initial value is provided', () => {
    renderWithProviders(
      <RecordInfoForm onSubmit={submitFn} record={{ name: 'testName', artist: 'testArtist' }} />
    );
    const recordNameInput = screen.getByLabelText('name');
    const artistInput = screen.getByLabelText('artist');

    expect(recordNameInput).toHaveValue('testName');
    expect(artistInput).toHaveValue('testArtist');
    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('should enable button only when all form fields have value', () => {
    renderWithProviders(<RecordInfoForm onSubmit={submitFn} />);

    const button = screen.getByRole('button');

    const nameInput = screen.getByLabelText('name');
    fireEvent.change(nameInput, { target: { value: 'abc' } });

    expect(button).toBeDisabled();

    const artistInput = screen.getByLabelText('artist');
    fireEvent.change(artistInput, { target: { value: 'test artist' } });

    expect(button).toBeEnabled();
  });

  it('should not be able to submit when form value is not valid', () => {
    renderWithProviders(<RecordInfoForm onSubmit={submitFn} />);

    const nameInput = screen.getByLabelText('name');
    const artistInput = screen.getByLabelText('artist');

    fireEvent.change(nameInput, { target: { value: 'abc' } });
    fireEvent.submit(artistInput);

    expect(submitFn).not.toHaveBeenCalled();

    fireEvent.change(artistInput, { target: { value: 'def' } });
    fireEvent.submit(artistInput);

    expect(submitFn).toHaveBeenCalledWith({
      name: 'abc',
      artist: 'def'
    });
  });

  describe('submit tests', () => {
    let recordNameInput: Element;
    let artistInput: Element;
    let button: Element;

    const setup = (initialRecordValue?: CreateRecordDto) => {
      renderWithProviders(<RecordInfoForm onSubmit={submitFn} record={initialRecordValue} />);

      recordNameInput = screen.getByLabelText('name');
      artistInput = screen.getByLabelText('artist');
      button = screen.getByRole('button');

      fireEvent.change(recordNameInput, { target: { value: 'abc' } });
      fireEvent.change(artistInput, { target: { value: 'test artist 1' } });
    };

    it('should set form to initial record value when it is provided', () => {
      setup({ name: 'initialName', artist: 'initialArtist' });
      fireEvent.click(button);

      expect(recordNameInput).toHaveValue('initialName');
      expect(artistInput).toHaveValue('initialArtist');
      expect(button).toBeEnabled();
    });

    it('should set form to initial state when button is clicked', () => {
      setup();
      fireEvent.click(button);

      expect(recordNameInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
      expect(button).toBeDisabled();
    });

    it('should set form to initial state when submitted', () => {
      setup();
      fireEvent.submit(artistInput);

      expect(recordNameInput).toHaveValue('');
      expect(artistInput).toHaveValue('');
      expect(button).toBeDisabled();
    });
  });
});
