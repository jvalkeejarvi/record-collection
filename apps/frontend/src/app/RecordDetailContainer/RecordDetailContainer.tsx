import { Button } from '@mui/material';
import { RecordDto, UpdateRecordDto } from '@record-collection/records-client';
import { useState } from 'react';
import RecordInfo from '../../components/RecordInfo/RecordInfo';
import { useAppDispatch } from '../../hooks';
import RecordInfoForm from '../RecordInfoForm/RecordInfoForm';
import { updateRecord } from '../recordSlice';

export interface RecordDetailContainerProps {
  record: RecordDto;
}

export function RecordDetailContainer({ record }: RecordDetailContainerProps) {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const dispatch = useAppDispatch();

  const handleSave = (editedRecord: UpdateRecordDto) => {
    dispatch(updateRecord({ id: record.id, changes: editedRecord }));
    setIsInEditMode(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        onClick={() => setIsInEditMode(!isInEditMode)}
      >{ isInEditMode ? 'Cancel' : 'Edit' }</Button>
      { isInEditMode
        ? <RecordInfoForm onSubmit={handleSave} record={record}></RecordInfoForm>
        : <RecordInfo record={record}></RecordInfo> }
    </div>
  );
}

export default RecordDetailContainer;
