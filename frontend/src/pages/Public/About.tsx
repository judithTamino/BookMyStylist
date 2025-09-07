import type { FunctionComponent } from 'react';
import MainLayout from '../../layout/MainLayout';
import Hero from '../../components/About/Hero';
import MyStory from '../../components/About/MyStory';
import Specialties from '../../components/About/Specialties';

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <MainLayout>
      <Hero />
      <MyStory />
      <Specialties />
    </MainLayout>
  );
};

export default About;
