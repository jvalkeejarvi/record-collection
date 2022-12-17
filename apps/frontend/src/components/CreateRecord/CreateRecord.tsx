import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';

import { addRecord } from '../../app/recordSlice';
import { useAppDispatch } from '../../hooks';

const createFormFields = ['name', 'artist'] as const;

export function CreateRecord() {
  const [newRecord, setNewRecord] = useState({ name: '', artist: '', submitDisabled: true });

  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    const newState = {
      ...newRecord,
      [name]: value,
    };
    setNewRecord({
      ...newState,
      submitDisabled: !createFormFields.every(field => newState[field])
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (newRecord.submitDisabled) {
      return;
    }
    event.preventDefault();
    const { submitDisabled, ...record } = newRecord;
    dispatch(addRecord(record));
    setNewRecord({ name: '', artist: '', submitDisabled: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      {
        createFormFields.map(field =>
          <TextField
            key={field}
            name={field}
            label={field}
            id={`new-record-${field}`}
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
        disabled={newRecord.submitDisabled}
      >Create new</Button>
    </form>
  );
}

export default CreateRecord;
