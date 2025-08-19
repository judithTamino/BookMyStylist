import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className='mx-4 sm:mx-[10%]'>
          <Navbar />
          <AppRoute />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
