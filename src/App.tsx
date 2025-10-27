import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './app/store';
import { ThemeProviderWrapper } from './styles/ThemeContext';
import AppRouter from './routes/AppRouter';


function App() {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <CssBaseline />
        <AppRouter />
      </ThemeProviderWrapper>
    </Provider>
  );
}

export default App;