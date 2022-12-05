import { Button, TextField } from '@mui/material';
import { useState } from 'react';

import { addRecord } from '../../app/recordSlice';
import { useAppDispatch } from '../../hooks';

export function CreateRecord() {
  const [value, setValue] = useState('');

  const dispatch = useAppDispatch();

  const create = () => {
    dispatch(addRecord(value));
    setValue('');
  };

  return (
    <div>
      <TextField
        type="text"
        size="small"
        value={value}
        onChange={e => setValue(e.target.value)}
        id="new-record-name"
      ></TextField>
      <Button
        variant="contained"
        size="small"
        onClick={create}
        disabled={!value}
      >Create new</Button>
    </div>
  );
}

export default CreateRecord;
