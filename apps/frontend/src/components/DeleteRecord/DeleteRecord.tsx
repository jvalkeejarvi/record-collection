import DeleteIcon from '@mui/icons-material/DeleteOutline';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import { useMemo } from 'react';

import { makeIsRecordDeletingById } from '../../app/recordSlice';
import { useAppSelector } from '../../hooks';

export interface DeleteRecordProps {
  id: number;
  onDelete: (id: number) => void;
}

export function DeleteRecord({ id, onDelete }: DeleteRecordProps) {
  const isDeletingById = useMemo(makeIsRecordDeletingById, []);

  const isDeleting = useAppSelector(state => isDeletingById(state, id));

  return (
    <div>
      <Tooltip title="Delete">
        <span>
          <IconButton
            color="error"
            onClick={() => onDelete(id)}
            disabled={isDeleting}
          >
            <DeleteIcon />
            { isDeleting && <CircularProgress size={20} /> }
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
}

export default DeleteRecord;
