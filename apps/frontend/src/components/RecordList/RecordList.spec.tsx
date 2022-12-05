import { renderWithProviders } from '../../utils/test-utils';
import RecordList from '../RecordList/RecordList';

jest.mock('@mui/x-data-grid', () => ({
  __esModule: true,
  DataGrid: () => <div></div>
}));

describe('RecordList', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<RecordList />);
    expect(baseElement).toBeTruthy();
  });
});
