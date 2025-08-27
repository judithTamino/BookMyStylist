import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <div className='relative'>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <AppRoute />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
