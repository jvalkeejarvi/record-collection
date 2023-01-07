import { CreateRecordDto, RecordDto, UpdateRecordDto } from '@record-collection/records-client';
import { GetRecordsDocument, GetRecordsQuery } from '@record-collection/records-graphql';
import {
  Action,
  AnyAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { recordsService } from './recordApi';
import { recordsClient } from './recordApiGql';

export const RECORDS_FEATURE_KEY = 'records';

export interface RecordsState extends EntityState<RecordDto> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error?: string | null;
  recordsOnDeletion: { [key: number]: boolean };
  pageNumber: number;
}

export const recordsAdapter = createEntityAdapter<RecordDto>();

export const fetchRecords = createAsyncThunk(
  'records/fetch',
  async () => (await recordsClient.query<GetRecordsQuery>({ query: GetRecordsDocument })).data.records
);

export const deleteRecord = createAsyncThunk(
  'records/delete',
  async (id: number) => {
    await recordsService.deleteRecord(id);
  }
);

export const addRecord = createAsyncThunk(
  'records/create',
  async ({ name, artist }: CreateRecordDto) => recordsService.createRecord({ name, artist })
);

export const updateRecord = createAsyncThunk(
  'records/edit',
  async ({ id, changes }: { id: number, changes: UpdateRecordDto }) => recordsService.updateRecord(id, changes)
);

export const initialRecordsState: RecordsState =
  recordsAdapter.getInitialState({
    loadingStatus: 'not loaded',
    error: null,
    recordsOnDeletion: {},
    pageNumber: 0,
  });

interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected');
}

export const recordsSlice = createSlice({
  name: RECORDS_FEATURE_KEY,
  initialState: initialRecordsState,
  reducers: {
    clear: recordsAdapter.removeAll,
    pageChange: (state: RecordsState, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(
        addRecord.fulfilled, (state, action) => {
          recordsAdapter.addOne(state, action);
        }
      )
      .addCase(updateRecord.pending, state => {
        state.loadingStatus = 'loading';
      })
      .addCase(updateRecord.rejected, state => {
        state.loadingStatus = 'loaded';
      })
      .addCase(
        updateRecord.fulfilled, (state, action) => {
          recordsAdapter.upsertOne(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(deleteRecord.pending, (state, action) => {
        const id = action.meta.arg;
        state.recordsOnDeletion[id] = true;
      })
      .addCase(
        deleteRecord.fulfilled,
        (state, action) => {
          const id = action.meta.arg;
          recordsAdapter.removeOne(state, id);
          const { [id]: deletedId, ...newState } = state.recordsOnDeletion;
          state.recordsOnDeletion = newState;
        }
      )
      .addCase(deleteRecord.rejected, (state, action) => {
        const id = action.meta.arg;
        const { [id]: _deleted, ...newState } = state.recordsOnDeletion;
        state.recordsOnDeletion = newState;
      })
      .addCase(fetchRecords.pending, state => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchRecords.fulfilled,
        (state, action) => {
          recordsAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchRecords.rejected, (state, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (_state, action) => {
          if (action.type.startsWith(deleteRecord.typePrefix)) {
            // TODO: Handle showing error in UI
          }
        }
      );
  },
});

export const recordsReducer = recordsSlice.reducer;

export const recordsActions = recordsSlice.actions;

const { selectAll, selectEntities, selectById } = recordsAdapter.getSelectors();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRecordsState = (rootState: any): RecordsState =>
  rootState[RECORDS_FEATURE_KEY];

export const selectAllRecord = createSelector(
  getRecordsState,
  selectAll
);

export const selectRecordEntities = createSelector(
  getRecordsState,
  selectEntities
);

export const selectRecordById = createSelector(
  getRecordsState,
  (_state: RecordsState, id: number) => id,
  selectById
);

export const makeIsRecordDeletingById = () => {
  const isRecordDeleting = createSelector(
    getRecordsState,
    (_state: RecordsState, id: number) => id,
    (state, id) => state.recordsOnDeletion[id]
  );
  return isRecordDeleting;
};
