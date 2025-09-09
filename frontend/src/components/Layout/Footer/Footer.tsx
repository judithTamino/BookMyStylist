import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

const Footer: FunctionComponent = () => {
  return (
    <footer className='pt-16 pb-2 md:pt-24'>
      <div className='px-4 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-slate-100 mt-4 bg-rose-600 rounded-2xl grid lg:grid-cols-2'>
        <div className='flex flex-col justify-between w-full pb-6'>
          <NavLink to='/' className='font-playfair text-4xl text-white'>
            SALON
          </NavLink>

          <div className='mt-6 text-sm md:text-base text-slate-200 leading-7'>
            <p>by appointment only</p>
            <p className=''>
              <span>need to change an appointment? email us at: </span>
              <a
                href='mailto:salon@email.com'
                className='font-bold block text-lg'
              >
                salon@email.com
              </a>
            </p>
            <p>567 East Cedar Street Some City Isreal</p>
          </div>
        </div>

        <div className='py-8'>
          <div>
            <h2 className='font-bold mb-4 text-slate-100'>Get in touch</h2>
            <div className='text-sm space-y-1'>
              <p>053 569 6159</p>
              <p>salon@email.com</p>
            </div>
          </div>

          <p className='pt-4 text-xs pb-5 text-slate-200'>
            © 2025 Judith.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
