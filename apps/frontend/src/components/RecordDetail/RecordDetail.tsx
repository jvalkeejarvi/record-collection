import { CircularProgress, Link } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import RecordDetailContainer from '../../app/RecordDetailContainer/RecordDetailContainer';
import { getRecordsState, selectRecordById } from '../../app/recordSlice';
import { useAppSelector } from '../../hooks';

export function RecordDetail() {
  const id = Number(useParams<{ id: string }>()?.id);
  const record = useAppSelector(state => selectRecordById(state, id));

  const { loadingStatus } = useAppSelector(getRecordsState);
  const isLoading = loadingStatus !== 'loaded';

  return (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <Link
          component={RouterLink}
          to={'/'}
          id="back-to-record-list"
        >Back to collection</Link>
      </div>

      <div>
        { record?.artist} - { record?.name }
      </div>

      { isLoading && <div>
        <CircularProgress />
      </div>}

      { !isLoading && (
        record
          ? <RecordDetailContainer record={record}></RecordDetailContainer>
          : <div>Record not found</div>
      )}
    </div>
  );
}

export default RecordDetail;
