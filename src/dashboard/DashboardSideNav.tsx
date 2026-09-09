import {
  FileText,
  History,
  LayoutDashboard,
  Settings,
  Stethoscope,
} from 'lucide-react';

import { NavLink } from 'react-router-dom';

function DashboardSideNav() {
  const menuItems = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Prediction',
      path: '/dashboard/prediction',
      icon: Stethoscope,
    },
    {
      name: 'History',
      path: '/dashboard/history',
      icon: History,
    },
    {
      name: 'Reports',
      path: '/dashboard/reports',
      icon: FileText,
    },
  ];

  return (
    <aside
      className="
        hidden
        w-64
        shrink-0
        border-r
        border-border
        bg-background
        transition-colors
        duration-300
        lg:block
      "
    >
      <div className="sticky top-20 h-[calc(100vh-5rem)]">
        <nav className="flex h-full flex-col px-4 py-6">
          {/* Navigation */}
          <div>
            <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Dashboard
            </p>

            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all ${isActive
                        ? 'bg-[#8B1E24]/10 text-[#8B1E24] dark:bg-red-500/15 dark:text-red-400'
                        : 'text-text-secondary hover:bg-surface hover:text-[#8B1E24] hover:[text-shadow:0_0_12px_rgba(139,30,36,0.5)] dark:hover:text-red-400 dark:hover:[text-shadow:0_0_12px_rgba(239,68,68,0.5)]'
                      }`
                    }
                  >
                    <Icon size={19} className="transition-transform duration-300 group-hover:scale-110" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 h-px bg-border" />

          {/* Settings */}
          <button
            type="button"
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-text-secondary transition-all hover:bg-surface hover:text-[#8B1E24] hover:[text-shadow:0_0_12px_rgba(139,30,36,0.5)] dark:hover:text-red-400 dark:hover:[text-shadow:0_0_12px_rgba(239,68,68,0.5)]"
          >
            <Settings size={19} className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-45" />
            <span>Settings</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}

export default DashboardSideNav;