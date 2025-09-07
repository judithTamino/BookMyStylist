import type { FunctionComponent } from 'react';
import PrimaryButton from '../UI/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';

interface MyStoryProps {}

const MyStory: FunctionComponent<MyStoryProps> = () => {
  const navigate = useNavigate();
  return (
    <section className='px-6 py-16'>
      <h2 className='section-title'>My Story</h2>
      <p className='mb-4'>
        Ever since I picked up my first pair of scissors, I knew I wanted to
        bring out the best in people through their hair. After working with hundreds of clients, I`ve learned that
        a great haircut is more than just style — it`s confidence.
      </p>
      <p className='mb-4'>
        My salon is more than just a place to get your hair done — it`s a space
        to relax, refresh, and leave feeling beautiful inside and out.
      </p>

      <p className="mb-8">
        Sign-up now to book an appointment. 
      </p>
      <PrimaryButton label='Signup' onClick={() => navigate('/register')} />
    </section>
  );
};

export default MyStory;
