import Navbar from './components/Navbar/Navbar';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <div className='relative'>
      <ThemeProvider>
        <AuthProvider>
          <Navbar />
          <div className="mx-4 sm:mx-[10%]">
          <AppRoute />
          </div>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
