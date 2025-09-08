import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from './context/theme.context';
import AppRoute from './routes/AppRoute';
import { AuthProvider } from './context/auth.context';

function App() {
  return (
    <div className='relative max-w-7xl mx-auto px-6'>
      <AuthProvider>
        <ThemeProvider>
          <ToastContainer />
          <AppRoute />
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
