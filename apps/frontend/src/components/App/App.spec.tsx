import { renderWithProviders } from '../../utils/test-utils';

import App from './App';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithProviders(<App />);

    expect(baseElement).toBeTruthy();
  });
});
