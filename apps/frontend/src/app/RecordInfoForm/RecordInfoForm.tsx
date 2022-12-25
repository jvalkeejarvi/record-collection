import { TextField, Button } from '@mui/material';
import { CreateRecordDto, RecordDto } from '@record-collection/records-client';
import { FormEvent, useState } from 'react';

const createFormFields = ['name', 'artist'] as const;

/* eslint-disable-next-line */
export interface RecordInfoFormProps {
  onSubmit: (formValue: CreateRecordDto) => void;
  record?: Partial<RecordDto>;
}

function getInitialRecordValue(record?: Partial<RecordDto>): CreateRecordDto {
  return {
    name: record?.name ?? '',
    artist: record?.artist ?? ''
  };
}

export function RecordInfoForm({ onSubmit, record }: RecordInfoFormProps) {
  const [newRecord, setNewRecord] = useState(getInitialRecordValue(record));

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
    onSubmit(newRecord);
    setNewRecord(getInitialRecordValue(record));
  };

  return (
    <form style={{ paddingTop: '10px' }} onSubmit={handleSubmit}>
      {
        createFormFields.map(field =>
          <div style={{ marginTop: '10px' }} key={field}>
            <TextField
              name={field}
              label={field}
              type="text"
              size="small"
              value={newRecord[field]}
              onChange={handleInputChange}
            ></TextField>
          </div>)
      }
      <Button
        type="submit"
        variant="contained"
        size="small"
        disabled={submitDisabled}
      >{ record ? 'Update' : 'Create record' }</Button>
    </form>
  );
}

export default RecordInfoForm;
