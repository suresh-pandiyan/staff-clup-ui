import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LeftSidebarMenu from "./components/Layout/LeftSidebarMenu";
import TopNavbar from "./components/Layout/TopNavbar";
import ScrollToTop from "./components/Layout/ScrollToTop";
import RouteChangeHandler from "./components/Layout/RouteChangeHandler";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import PublicRoute from "./components/Layout/PublicRoute";
import { AppProvider } from "./contexts/AppContext";

import Home from "./pages/Home";
import Accounts from "./pages/accounts";
import Shares from "./pages/shares";
import Members from "./pages/members";
import ChitFunds from "./pages/chit-funds";
import Loans from "./pages/loans";
import EmergencyFunds from "./pages/emergency-funds";
import Events from "./pages/events";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard/Analytics";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [active, setActive] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname); // Get the current path
  }, []);

  const toggleActive = () => {
    setActive(!active);
  };

  // Define which pages should not show the navigation
  const isPublicPage = [
    "/",
    "/features/",
    "/team/",
    "/faq/",
    "/contact/",
    "/coming-soon/",
  ].includes(pathname);

  // Define authentication pages
  const isAuthPage = [
    "/authentication/sign-in/",
    "/authentication/sign-up/",
    "/authentication/forgot-password/",
    "/authentication/reset-password/",
    "/authentication/confirm-email/",
    "/authentication/lock-screen/",
    "/authentication/logout/",
    "/login/",
    "/login",
  ].includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className={`main-wrapper-content ${active ? "active" : ""}`}>
          <Router>
            <RouteChangeHandler />
            {!isPublicPage && !isAuthPage && (
              <>
                <TopNavbar toggleActive={toggleActive} />

                <LeftSidebarMenu toggleActive={toggleActive} />
              </>
            )}

            <div className="main-content">
              <ScrollToTop />

              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                {/* Protected Routes */}
                <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
                <Route path="/members" element={<ProtectedRoute><Members /></ProtectedRoute>} />
                <Route path="/shares" element={<ProtectedRoute><Shares /></ProtectedRoute>} />
                <Route path="/chitfunds" element={<ProtectedRoute><ChitFunds /></ProtectedRoute>} />
                <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
                <Route path="/emergency-funds" element={<ProtectedRoute><EmergencyFunds /></ProtectedRoute>} />
                <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Dashboard Sub-routes */}
                <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              </Routes>

              {/* {!isAuthPage && <Footer />} */}
            </div>
          </Router>
        </div>
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
