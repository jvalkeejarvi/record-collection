import { Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useCallback } from 'react';

import {
  deleteRecord,
  getRecordsState,
  recordsActions,
  RecordsEntity,
  selectAllRecord
} from '../../app/recordSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import CreateRecord from '../CreateRecord/CreateRecord';
import DeleteRecord from '../DeleteRecord/DeleteRecord';
import Record from '../Record/Record';

import styles from './RecordList.module.css';

export function RecordList() {
  const records = useAppSelector(selectAllRecord);
  const { loadingStatus, pageNumber } = useAppSelector(getRecordsState);

  const dispatch = useAppDispatch();

  const onDelete = useCallback((id: number) => {
    if (window.confirm('Delete record?')) {
      dispatch(deleteRecord(id));
    }
  }, [dispatch]);

  const onPageChange = (pageNumber: number) => {
    dispatch(recordsActions.pageChange(pageNumber));
  };

  const isLoading = !['loaded', 'error'].includes(loadingStatus);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, type: 'number' },
    {
      field: 'name',
      headerName: 'Name',
      width: 500,
      renderCell: (params: GridRenderCellParams<RecordsEntity>) => <Record record={params.row}></Record>
    },
    { field: 'email', headerName: 'email', width: 500 },
    {
      // HACK: empty field name results in incorrect column header background
      field: '____',
      headerName: '',
      disableColumnMenu: true,
      sortable: false,
      filterable: false,
      width: 100,
      renderCell: (params: GridRenderCellParams<RecordsEntity>) =>
        <DeleteRecord id={params.row.id} onDelete={onDelete}></DeleteRecord>
    },
  ];

  return (
    <div className={styles.recordList}>
      <DataGrid
        page={pageNumber}
        loading={isLoading}
        style={{ minHeight: '500px' }}
        rows={records}
        columns={columns}
        autoPageSize={true}
        disableSelectionOnClick={true}
        onPageChange={onPageChange}
      />
      <div>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => dispatch(recordsActions.clear())}
        >Delete all</Button>
        <CreateRecord />
      </div>
    </div>
  );
}

export default RecordList;
