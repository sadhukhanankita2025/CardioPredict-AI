import { Outlet } from 'react-router-dom';

import DashboardHeader from './DashboardHeader';
import DashboardSideNav from './DashboardSideNav';
import Footer from '../components/Footer';

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      {/* Fixed Dashboard Header */}
      <DashboardHeader />

      {/* Dashboard Body */}
      <div className="flex min-h-[calc(100vh-5rem)] pt-20">
        {/* Dashboard Sidebar */}
        <DashboardSideNav />

        {/* Dashboard Pages */}
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>

      {/* Dashboard Footer */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;