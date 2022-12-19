import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

import { addRecord } from '../../app/recordSlice';
import { useAppDispatch } from '../../hooks';

const createFormFields = ['name', 'artist'] as const;

export function CreateRecord() {
  const [newRecord, setNewRecord] = useState({ name: '', artist: '' });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewRecord(previousFormValue => ({
      ...previousFormValue,
      [name]: value,
    }));
  };

  const submitDisabled = !createFormFields.every(field => newRecord[field]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (submitDisabled) {
      return;
    }
    event.preventDefault();
    dispatch(addRecord(newRecord));
    setNewRecord({ name: '', artist: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        createFormFields.map(field =>
          <TextField
            key={field}
            name={field}
            label={field}
            type="text"
            size="small"
            value={newRecord[field]}
            onChange={handleInputChange}
          ></TextField>)
      }
      <Button
        type="submit"
        variant="contained"
        size="small"
        disabled={submitDisabled}
      >Create new</Button>
    </form>
  );
}

export default CreateRecord;
