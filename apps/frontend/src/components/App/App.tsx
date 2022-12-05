import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { fetchRecords } from '../../app/recordSlice';
import { useAppDispatch } from '../../hooks';
import { Topbar } from '../Topbar/Topbar';

import styles from './App.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRecords());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Topbar />
      <div className={styles.appContent}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
