import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSideNav from "./DashboardSideNav";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <DashboardHeader />

      <div className="flex pt-20">
        <DashboardSideNav />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;