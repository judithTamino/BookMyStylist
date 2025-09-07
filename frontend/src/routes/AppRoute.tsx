import { lazy, Suspense, type FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';

interface AppRouteProps {}

const Home = lazy(() => import('../pages/Public/Home'));
const About = lazy(() => import('../pages/Public/About'));
const Services = lazy(() => import('../pages/Public/Services'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Login = lazy(() => import('../pages/Auth/Login'));

const AppRoute: FunctionComponent<AppRouteProps> = () => {
  return (
    <Suspense>
      <Routes>
        // PUBLIC ROUTES
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        // USER ROUTES
        {/* <Route element={<PrivateRoute roles={['user']} />}>
        </Route> */}
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
