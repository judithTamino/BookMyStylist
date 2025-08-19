import type { FunctionComponent } from 'react';
import Hero from '../../components/Hero';

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default Home;
