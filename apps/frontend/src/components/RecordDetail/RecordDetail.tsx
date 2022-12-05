import { Link } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';

import RecordInfo from '../RecordInfo/RecordInfo';

export function RecordDetail() {
  const id = Number(useParams<{ id: string }>()?.id);

  return (
    <div>
      <Link component={RouterLink} to={'/'} id="back-to-record-list">Back to collection</Link>;
      <RecordInfo id={id}></RecordInfo>
    </div>
  );
}

export default RecordDetail;
