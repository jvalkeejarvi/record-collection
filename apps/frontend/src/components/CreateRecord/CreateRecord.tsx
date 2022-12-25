import { CreateRecordDto } from '@record-collection/records-client';
import RecordInfoForm from '../../app/RecordInfoForm/RecordInfoForm';

import { addRecord } from '../../app/recordSlice';
import { useAppDispatch } from '../../hooks';

export function CreateRecord() {
  const dispatch = useAppDispatch();

  const handleSubmit = (newRecord: CreateRecordDto) => {
    dispatch(addRecord(newRecord));
  };

  return (
    <RecordInfoForm onSubmit={handleSubmit}></RecordInfoForm>
  );
}

export default CreateRecord;
