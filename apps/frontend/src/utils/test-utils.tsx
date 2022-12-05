import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { AppStore, RootState, setupStore } from '../store';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Prepend<A extends any[], T> = ((arg: T, ...args: A) => any) extends ((...args: infer U) => any) ? U : never;

type DP<T, D, A extends any[]> =
  A['length'] extends D ? any : T extends Record<keyof any, any> ? {
    [K in keyof T]?: T[K] extends (infer U)[] ? DP<U, D, Prepend<A, any>>[] : DP<T[K], D, Prepend<A, any>>
  } : T;

type DeepPartial<T, Depth extends number = 4 > = DP<T, Depth, []>;

export function mockOf<T, Depth extends number = 3>(arg: DeepPartial<T, Depth>): T {
  return arg as T;
}
