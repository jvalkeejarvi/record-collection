import { Link } from '@mui/material';
import { RecordEntity } from '@record-collection/records-client';
import { Link as RouterLink } from 'react-router-dom';

export interface RecordProps {
  record: RecordEntity;
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
