import { lazy, Suspense, type FunctionComponent } from 'react';
import { Routes, Route } from 'react-router-dom';

interface AppRouteProps {}

const Home = lazy(() => import('../pages/Public/Home'));
const About = lazy(() => import('../pages/Public/About'));
const Services = lazy(() => import('../pages/Public/Services'));
const Contact = lazy(() => import('../pages/Public/Contact'));

const AppRoute: FunctionComponent<AppRouteProps> = () => {
  return (
      <Suspense>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/' element={<About />} />
          <Route path='/' element={<Services />} />
          <Route path='/' element={<Contact />} />
        </Routes>
      </Suspense>
  );
};

export default AppRoute;
