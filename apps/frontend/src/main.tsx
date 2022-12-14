import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './components/App/App';

import { Provider } from 'react-redux';
import { setupStore } from './store';
import RecordList from './components/RecordList/RecordList';
import RecordDetail from './components/RecordDetail/RecordDetail';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={setupStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<RecordList />} />
            <Route path=":id" element={<RecordDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
