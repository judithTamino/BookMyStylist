import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface FooterProps {}

const Footer: FunctionComponent<FooterProps> = () => {
  return (
    <footer className='px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-slate-50 mt-4 bg-amber-500'>
      <div className='flex flex-col md:flex-row justify-between w-full gap-10 border-b border-slate-50/40 pb-6'>
        <div className='md:max-w-96'>
          <NavLink
            to='/'
            className='font-playfair text-4xl text-white'
          >
            SALON
          </NavLink>
          <div className='mt-6 text-sm flex flex-col gap-1'>
            <p>by appointment only</p>
            <p>need to change an appointment? email us at:</p>
            <a href="mailto:salon@email.com" className='font-bold'>salon@email.com</a>
          </div>
        </div>
        <div className='flex-1 flex items-start md:justify-end gap-20'>
          <div>
            <h2 className='font-semibold mb-5 text-slate-50'>Get in touch</h2>
            <div className='text-sm space-y-2'>
              <p>+1-212-456-7890</p>
              <p>salon@email.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className='pt-4 text-center text-xs md:text-sm pb-5'>
        Copyright 2025 © Judith. All
        Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
