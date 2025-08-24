import type { FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <>
      <MainLayout>ABOUT PAGE</MainLayout>
    </>
  );
};

export default About;
