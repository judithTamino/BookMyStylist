import { lazy, Suspense, type FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

interface AppRouteProps {}

const Home = lazy(() => import('../pages/Public/Home'));
const About = lazy(() => import('../pages/Public/About'));
const Services = lazy(() => import('../pages/Public/Services'));
const Register = lazy(() => import('../pages/Auth/Register'));
const Login = lazy(() => import('../pages/Auth/Login'));

const Appointments = lazy(() => import('../pages/User/Appointments'));
const Favorites = lazy(() => import('../pages/User/Favorites'));
const Profile = lazy(() => import('../pages/User/Profile'));
const BookAppointment = lazy(() => import('../pages/User/BookAppointment'));

const AdminDashboard = lazy(() => import('../pages/Admin/AdminDashboard'));
const ManageServices = lazy(() => import('../pages/Admin/ManageServices'));
const ManageUsers = lazy(() => import('../pages/Admin/ManageUsers'));
const ManageAppointments = lazy(
  () => import('../pages/Admin/ManageAppointments')
);
const ManageWorkingHours = lazy(
  () => import('../pages/Admin/ManageWorkingHours')
);

const AppRoute: FunctionComponent<AppRouteProps> = () => {
  return (
    <Suspense>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        // USER ROUTES
        <Route element={<PrivateRoute roles={['user']} />}>
          <Route path='/my-appointments' element={<Appointments />} />
          <Route path='/my-favorites' element={<Favorites />} />
          <Route path='/my-profile' element={<Profile />} />
          <Route path='/book-appointment/:id' element={<BookAppointment />} />
        </Route>
        // ADMIN ROUTES
        <Route element={<PrivateRoute roles={['admin']} />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/appointments' element={<ManageAppointments />} />
          <Route path='/admin/services' element={<ManageServices />} />
          <Route path='/admin/working-hours' element={<ManageWorkingHours />} />
          <Route path='/admin/users' element={<ManageUsers />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoute;
