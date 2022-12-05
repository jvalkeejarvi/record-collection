import { act, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RecordsEntity } from '../../app/recordSlice';
import { mockOf } from '../../utils/test-utils';
import Record from './Record';

function renderWithRoutes() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<Record record={mockOf<RecordsEntity>({ name: 'test', id: 88 })} />} />
        <Route path=':id' element={<div>DETAIL STATE</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Record', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRoutes();
    expect(baseElement).toBeTruthy();
  });

  it('should go to detail state on link press', () => {
    const { baseElement, getByRole } = renderWithRoutes();

    act(() => {
      const detailLink = getByRole('link');
      detailLink?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(baseElement.textContent).toBe('DETAIL STATE');
  });
});
