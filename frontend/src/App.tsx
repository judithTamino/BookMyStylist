import { ToastContainer } from 'react-toastify';
import { AuthProvider, useAuth } from './context/auth.context';
import { ThemeProvider } from './context/ThemeContext';
import AppRoute from './routes/AppRoute';


function App() {
  return (
    <div className='relative'>
      <ThemeProvider>
        <AuthProvider>
          <ToastContainer />
          <AppRoute />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
