"use client";

import React from 'react';
import Link from 'next/link';

export const navItems = [
  { key: 'overview', title: 'Overview', href: '/dashboard', icon: 'chart-pie' },
  { key: 'customers', title: 'Posts', href: '/dashboard/posts', icon: 'users' },
  { key: 'integrations', title: 'Orders', href: '/dashboard/orders', icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: '/dashboard/settings', icon: 'gear-six' },
  // { key: 'account', title: 'Account', href: '/dashboard/account', icon: 'user' },
  // { key: 'error', title: 'Error', href: '/errors/notFound', icon: 'x-square' },
];

// Define the navigation component
const Navigation = () => {
  return (
    <nav>
      <ul>
        {navItems.map(({ key, title, href, icon }) => (
          <li key={key}>
            <Link href={href}>
              <a>
                <i className={`icon-${icon}`} /> {title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
