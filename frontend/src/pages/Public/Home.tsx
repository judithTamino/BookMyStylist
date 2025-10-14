import type { FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';
import Hero from '../../components/Home/Hero';
import About from '../../components/Home/About';
import OurServices from '../../components/Home/OurServices';
import BookingSteps from '../../components/Home/BookingSteps';

const Home: FunctionComponent = () => {
  return (
    <MainLayout>
      <Hero />
      <About />
      <OurServices />
      <BookingSteps />
    </MainLayout>
  );
};

export default Home;
