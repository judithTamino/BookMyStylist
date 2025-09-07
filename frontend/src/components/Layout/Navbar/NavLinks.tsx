import type { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinksProps {
  links: Record<string, string>[];
}

const NavLinks: FunctionComponent<NavLinksProps> = ({ links }) => {
  return (
    <>
      {links.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          className={({ isActive }) =>
            `p-1 ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-500 font-semibold'
                : 'text-slate-900 dark:text-slate-100 hover:text-indigo-600'
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;
