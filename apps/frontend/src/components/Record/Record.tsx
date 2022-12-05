import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { RecordsEntity } from '../../app/recordSlice';

export interface RecordProps {
  record: RecordsEntity;
}

export function Record({ record }: RecordProps) {
  const recordLink = `${record.id}`;

  return (
    <div>
      <Link component={RouterLink} to={recordLink}>{record.name}</Link>
    </div>
  );
}

export default Record;
