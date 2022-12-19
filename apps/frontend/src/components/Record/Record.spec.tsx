import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { RecordDto } from '@record-collection/records-client';

import { mockOf } from '../../utils/test-utils';
import Record from './Record';

function renderWithRoutes() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route path='/' element={<Record record={mockOf<RecordDto>({ name: 'test', id: 88 })} />} />
        <Route path=':id' element={<div>DETAIL STATE</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Record', () => {
  it('should go to detail state on link press', () => {
    renderWithRoutes();
    const detailLink = screen.getByRole('link');
    fireEvent.click(detailLink);

    expect(screen.getByText('DETAIL STATE')).toBeInTheDocument();
  });
});
