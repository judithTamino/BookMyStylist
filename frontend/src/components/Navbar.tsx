import { useState, type FunctionComponent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface NavbarProps {}

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'SERVICES', path: '/' },
  { name: 'ABOUT', path: '/' },
  { name: 'CONTACT', path: '/' },
];

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [token, setToken] = useState<boolean>(true);

  return (
    <nav className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
      <NavLink to='/'>BookMyStylist</NavLink>

      <ul className='hidden md:flex items-start gap-5 font-medium'>
        {navLinks.map(({ name, path }) => (
          <li key={name}>
            <NavLink to={path} className='py-1'>
              {name}
              <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="">
        {token ? (
          <div className="">
            <i className='ri-user-smile-line'></i>
            <i className='ri-arrow-down-s-line'></i>
          </div>
        ) : ()}
      </div>
    </nav>
  );
};

export default Navbar;
