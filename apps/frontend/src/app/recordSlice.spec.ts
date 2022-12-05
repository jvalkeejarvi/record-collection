import {
  addRecord,
  deleteRecord,
  fetchRecords,
  recordsActions,
  recordsAdapter,
  recordsReducer,
} from './recordSlice';

describe('records reducer', () => {
  it('should handle initial state', () => {
    const expected = recordsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
      pageNumber: 0,
      recordsOnDeletion: {},
    });

    expect(recordsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchRecords', () => {
    let state = recordsReducer(
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchRecords.pending(null as any)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchRecords.fulfilled([{ id: 1 }], null as any)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchRecords.rejected(new Error('Uh oh'), null as any)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });

  it('should handle deleteRecord', () => {
    let state = recordsReducer(
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchRecords.fulfilled([{ id: 4 }, { id: 5 }], null as any)
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteRecord.pending(null as any, 4)
    );

    expect(state).toEqual(
      expect.objectContaining({
        recordsOnDeletion: { 4: true },
        entities: { 4: { id: 4 }, 5: { id: 5 } }
      })
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteRecord.pending(null as any, 5)
    );

    expect(state).toEqual(
      expect.objectContaining({
        recordsOnDeletion: { 4: true, 5: true },
        entities: { 4: { id: 4 }, 5: { id: 5 } },
      })
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteRecord.fulfilled(null, null as any, 4)
    );

    expect(state).toEqual(
      expect.objectContaining({
        recordsOnDeletion: { 5: true },
        entities: { 5: { id: 5 } },
      })
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      deleteRecord.rejected(new Error('Error'), null as any, 5)
    );

    expect(state).toEqual(
      expect.objectContaining({
        recordsOnDeletion: {},
        entities: { 5: { id: 5 } },
      })
    );
  });

  it('should handle addRecord', () => {
    let state = recordsReducer(
      undefined,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchRecords.fulfilled([{ id: 1 }], null as any)
    );

    expect(state).toEqual(
      expect.objectContaining({
        entities: { 1: { id: 1 } },
      })
    );

    state = recordsReducer(
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      addRecord.fulfilled({ id: 90 }, null as any, null as any)
    );

    expect(state).toEqual(
      expect.objectContaining({
        entities: { 1: { id: 1 }, 90: { id: 90 } },
      })
    );
  });

  it('should handle page change', () => {
    let state = recordsReducer(undefined, recordsActions.pageChange(3));

    expect(state).toEqual(expect.objectContaining({ pageNumber: 3 }));

    state = recordsReducer(undefined, recordsActions.pageChange(2));

    expect(state).toEqual(expect.objectContaining({ pageNumber: 2 }));
  });
});
