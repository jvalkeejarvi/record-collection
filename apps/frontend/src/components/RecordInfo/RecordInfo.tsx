import { CircularProgress } from '@mui/material';
import { useAppSelector } from '../../hooks';
import { getRecordsState, selectRecordById } from '../../app/recordSlice';

export interface RecordInfoProps {
  id: number;
}

export function RecordInfo({ id }: RecordInfoProps) {
  const record = useAppSelector(state => selectRecordById(state, id));
  const { loadingStatus } = useAppSelector(getRecordsState);

  if (loadingStatus !== 'loaded') {
    return <div>
      <CircularProgress />
    </div>;
  }

  if (!record) {
    return <div>
      <div>Record not found</div>
    </div>;
  }

  return (
    <div>
      <p>{record.name}</p>
      <p>{record.id}</p>
    </div>
  );
}

export default RecordInfo;
