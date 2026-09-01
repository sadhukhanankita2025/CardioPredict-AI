import {
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Prevention from './pages/Prevention';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

import Dashboard from './dashboard/Dashboard';
import Prediction from './dashboard/Prediction';
import History from './dashboard/History';
import Reports from './dashboard/Reports';
import DashboardLayout from './dashboard/DashboardLayout';

// ============================================================
// PUBLIC WEBSITE LAYOUT
// ============================================================

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

// ============================================================
// APP
// ============================================================

function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC WEBSITE
      ====================================================== */}

      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route
          path="/prevention"
          element={<Prevention />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>


      {/* =====================================================
          PROTECTED DASHBOARD
      ====================================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard/prediction"
            element={<Prediction />}
          />

          <Route
            path="/dashboard/history"
            element={<History />}
          />

          <Route
            path="/dashboard/reports"
            element={<Reports />}
          />

        </Route>

      </Route>


      {/* =====================================================
          UNKNOWN URL
      ====================================================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;