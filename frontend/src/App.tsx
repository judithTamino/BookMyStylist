import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <div className='relative'>
      <ThemeProvider>
        <AuthProvider>
            <AppRoute />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
