import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ViewList, ViewModule, Sort, CalendarMonth } from "@mui/icons-material";
import SearchForm from "./SearchForm";
import Dropdown from "./Dropdown";
import Notifications from "./Notifications";
import Profile from "./Profile";
import FullscreenButton from "./FullscreenButton";
import AppsMenu from "./AppsMenu";
import ChooseLanguage from "./ChooseLanguage";
import DarkMode from "./DarkMode";
import ControlPanel from "../ControlPanel";
import HorizontalNavbar from "./HorizontalNavbar";
import { Link } from "react-router-dom";
import { useFinancialYears } from "../../../hooks";

const TopNavbar = ({ toggleActive }) => {
  const { data: financialYears = [], isLoading: financialYearsLoading, error: financialYearsError } = useFinancialYears();
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);

  const handleFinancialYearSelect = (option) => {
    setSelectedFinancialYear(option);
    console.log('Selected Financial Year:', option);
    // You can add additional logic here like updating context, localStorage, etc.
  };

  // Auto-select the currently active financial year
  useEffect(() => {
    if (financialYears?.data && financialYears.data.length > 0 && !selectedFinancialYear) {
      const activeYear = financialYears.data.find(year => year.currentlyActive);
      if (activeYear) {
        setSelectedFinancialYear({
          id: activeYear.id || activeYear._id,
          label: activeYear.financeYear,
          icon: <CalendarMonth />,
          description: activeYear.currentlyActive ? 'Active' : 'Inactive',
          currentlyActive: activeYear.currentlyActive
        });
      }
    }
  }, [financialYears, selectedFinancialYear]);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      if (window.scrollY > 100) {
        navbar?.classList.add("sticky");
      } else {
        navbar?.classList.remove("sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log('financialYears', financialYears);

  return (
    <div className="top-navbar-dark">
      <AppBar
        id="navbar"
        color="inherit"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "initial",
          borderRadius: "0 0 15px 15px",
          py: { xs: "15px", sm: "3px" },
          width: "auto",
          zIndex: "489",
        }}
        className="top-navbar"
      >
        <Box className="top-navbar-content">
          <Toolbar
            sx={{
              display: { xs: "block", sm: "flex" },
              justifyContent: { xs: "center", sm: "space-between" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: "10px", sm: "5px", md: "15px" },
              }}
            >
              <Box className="logos">
                <Link to="/dashboard/" className="logo">
                  <img
                    src="/images/logo.svg"
                    alt="logo"
                    width={100}
                    height={26}
                  />
                </Link>

                <Link to="/dashboard/" className="white-logo">
                  <img
                    src="/images/white-logo.svg"
                    alt="logo"
                    width={100}
                    height={26}
                  />
                </Link>
              </Box>

              <Tooltip title="Hide/Show" arrow>
                <IconButton
                  size="small"
                  edge="start"
                  color="inherit"
                  onClick={toggleActive}
                  className="top-burger"
                >
                  <i className="material-symbols-outlined">menu</i>
                </IconButton>
              </Tooltip>

              {/* Search form */}
              <SearchForm />

              {/* Calendar Year Dropdown */}
              <Dropdown
                label={selectedFinancialYear ? selectedFinancialYear.label : "Calendar Year"}
                options={
                  financialYearsLoading
                    ? [{ id: 'loading', label: 'Loading...', icon: <CalendarMonth /> }]
                    : financialYearsError
                      ? [{ id: 'error', label: 'Error loading years', icon: <CalendarMonth /> }]
                      : financialYears?.data.length > 0
                        ? financialYears?.data.map(year => ({
                          id: year.id || year._id,
                          label: year.financeYear,
                          icon: <CalendarMonth />,
                          description: year.currentlyActive ? 'Active' : 'Inactive'
                        }))
                        : [{ id: 'no-data', label: 'No financial years', icon: <CalendarMonth /> }]
                }
                onSelect={handleFinancialYearSelect}
                showChip={true}
                startIcon={<CalendarMonth />}
                chipColor={selectedFinancialYear?.currentlyActive ? "success" : "default"}
                disabled={financialYearsLoading}
              />

              {/* AppsMenu */}
              {/* <AppsMenu /> */}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: { xs: "8px", sm: "8px", lg: "15px" },
                mt: { xs: "10px", sm: "0px" },
              }}
            >
              {/* DarkMode */}
              <DarkMode />

              {/* ChooseLanguage */}
              {/* <ChooseLanguage /> */}

              {/* FullscreenButton */}
              {/* <FullscreenButton /> */}

              {/* Notifications */}
              <Notifications />

              {/* Profile */}
              <Profile />

              {/* ControlPanel */}
              {/* <ControlPanel /> */}
            </Box>
          </Toolbar>
        </Box>

        <HorizontalNavbar />
      </AppBar>
    </div>
  );
};

export default TopNavbar;
