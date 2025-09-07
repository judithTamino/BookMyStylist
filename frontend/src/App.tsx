import { ThemeProvider } from './context/ThemeContext';
import AppRoute from './routes/AppRoute';

function App() {
  return (
    <div className='relative max-w-7xl mx-auto px-6'>
      <ThemeProvider>
        <AppRoute />
      </ThemeProvider>
      {/* <ThemeProvider>
        <AuthProvider>
          <ToastContainer />
          <AppRoute />
        </AuthProvider>
      </ThemeProvider> */}
    </div>
  );
}

export default App;
