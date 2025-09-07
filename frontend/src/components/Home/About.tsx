import type { FunctionComponent } from 'react';

const About: FunctionComponent = () => {
  return (
    <section className='max-w-4xl mx-auto px-6  md:py-24 py-16 md:text-center'>
      <h2 className='section-title'>About Me</h2>
      <p className='text-lg text-slate-700 dark:text-slate-400'>
        I believe a great hairstyle can transform not just how you look, but how
        you feel. 
        <br />With 10 years of experience in haircuts, coloring, and
        styling, I`m here to give you a personalized experience in a warm and
        relaxed space.
      </p>
    </section>
  );
};

export default About;
