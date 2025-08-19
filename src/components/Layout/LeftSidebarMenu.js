import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import GroupsIcon from '@mui/icons-material/Groups';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SavingsIcon from '@mui/icons-material/Savings';
import EventIcon from '@mui/icons-material/Event';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
  {
    transform: "rotate(90deg)",
  },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const LeftSidebarMenu = ({ toggleActive }) => {
  const [expanded, setExpanded] = useState("panel1");
  const location = useLocation(); // Get current location/pathname
  const { logout, isLoading } = useAuth();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleLogout = async () => {
    await logout();
  };

  // Function to check if current pathname matches the link path
  const isActiveLink = (path) => (location.pathname === path ? "active" : "");

  // Enable the dark sidebar exclusively for the /dashboard/beauty-salon/ page URL.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Only check or set the theme if we're on the beauty-salon page.
    if (location.pathname === "/dashboard/beauty-salon/") {
      const storedTheme = localStorage.getItem("beautySalonSidebarTheme");
      if (storedTheme) {
        setIsDark(storedTheme === "dark-theme");
      } else {
        // Default to dark theme and persist it in localStorage
        setIsDark(true);
        localStorage.setItem("beautySalonSidebarTheme", "dark-theme");
      }
    } else {
      // For other pages, do not use localStorage for the theme
      setIsDark(false);
    }
  }, [location.pathname]);

  return (
    <Box
      className={`leftSidebarDark hide-for-horizontal-nav ${location.pathname === "/dashboard/beauty-salon/" && isDark
        ? "dark-theme"
        : ""
        }`}
    >
      <Box className="left-sidebar-menu">
        <Box className="logo">
          <Link to="/dashboard">
            <img
              src="/images/logo-icon.svg"
              alt="logo-icon"
              width={26}
              height={26}
            />
            <Typography component={"span"}>Staff Club</Typography>
          </Link>
        </Box>

        <Box className="burger-menu" onClick={toggleActive}>
          <Typography component={"span"} className="top-bar"></Typography>
          <Typography component={"span"} className="middle-bar"></Typography>
          <Typography component={"span"} className="bottom-bar"></Typography>
        </Box>

        <Box className="sidebar-inner">
          <Box className="sidebar-menu">
            <Typography
              className="sub-title"
              sx={{
                display: "block",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              MAIN
            </Typography>


            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
              className="mat-accordion"
            >
              <AccordionSummary
                className="mat-summary"
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <i className="material-symbols-outlined">note_stack</i>
                <Typography component={"span"} className="title">
                  Accounts
                </Typography>
              </AccordionSummary>

              <AccordionDetails className="mat-details">
                <ul className="sidebar-sub-menu">
                  <li className="sidemenu-item">
                    <a href="/" className="sidemenu-link">
                      Home
                    </a>
                  </li>

                  <li className="sidemenu-item">
                    <a href="/features/" className="sidemenu-link">
                      Features
                    </a>
                  </li>

                  <li className="sidemenu-item">
                    <a href="/team/" className="sidemenu-link">
                      Our Team
                    </a>
                  </li>

                  <li className="sidemenu-item">
                    <a href="/faq/" className="sidemenu-link">
                      FAQ’s
                    </a>
                  </li>

                  <li className="sidemenu-item">
                    <a href="/contact/" className="sidemenu-link">
                      Contact
                    </a>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>

            <Typography
              className="sub-title"
              sx={{
                display: "block",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              Services
            </Typography>

            <Link
              to="/members/"
              className={`sidebar-menu-link ${isActiveLink(
                "/members/"
              )}`}
            >
              <GroupsIcon color="primary" />

              <Typography component={"span"} className="title">
                Members
              </Typography>
            </Link>

            <Link
              to="/shares/"
              className={`sidebar-menu-link ${isActiveLink(
                "/shares/"
              )}`}
            >
              <CurrencyExchangeIcon color="primary" />
              <Typography component={"span"} className="title">
                Share
              </Typography>
            </Link>

            <Link
              to="/chitfunds/"
              className={`sidebar-menu-link ${isActiveLink("/chitfunds/")}`}
            >
              <SavingsIcon color="primary" />
              <Typography component={"span"} className="title">
                Chitfund
              </Typography>
            </Link>

            <Link
              to="/loans/"
              className={`sidebar-menu-link ${isActiveLink("/loans/")}`}
            >
              <AttachMoneyIcon color="primary" />
              <Typography component={"span"} className="title">
                Loan
              </Typography>
            </Link>

            <Link
              to="/events/"
              className={`sidebar-menu-link ${isActiveLink("/events/")}`}
            >
              <EventIcon color="primary" />
              <Typography component={"span"} className="title">
                Events
              </Typography>
            </Link>

            <Link
              to="/emergency-funds/"
              className={`sidebar-menu-link ${isActiveLink("/emergency-funds/")}`}
            >
              < HealthAndSafetyIcon color="primary" />
              <Typography component={"span"} className="title">
                Emergency Fund
              </Typography>
            </Link>


            <Typography
              className="sub-title"
              sx={{
                display: "block",
                fontWeight: "500",
                textTransform: "uppercase",
              }}
            >
              OTHERS
            </Typography>

            <Link
              to="/my-profile/"
              className={`sidebar-menu-link ${isActiveLink("/my-profile/")}`}
            >
              <i className="material-symbols-outlined">account_circle</i>
              <Typography component={"span"} className="title">
                My Profile
              </Typography>
            </Link>

            <Accordion
              expanded={expanded === "panel31"}
              onChange={handleChange("panel31")}
              className="mat-accordion"
            >
              <AccordionSummary
                className="mat-summary"
                aria-controls="panel31d-content"
                id="panel31d-header"
              >
                <i className="material-symbols-outlined">settings</i>
                <Typography component={"span"} className="title">
                  Settings
                </Typography>
              </AccordionSummary>

              <AccordionDetails className="mat-details">
                <ul className="sidebar-sub-menu">
                  <li className="sidemenu-item">
                    <Link
                      to="/settings/account-settings"
                      className={`sidemenu-link ${isActiveLink(
                        "/settings/account-settings"
                      )}`}
                    >
                      Account Settings
                    </Link>
                  </li>

                  <li className="sidemenu-item">
                    <Link
                      to="/settings/change-password/"
                      className={`sidemenu-link ${isActiveLink(
                        "/settings/change-password/"
                      )}`}
                    >
                      Change Password
                    </Link>
                  </li>

                  <li className="sidemenu-item">
                    <Link
                      to="/settings/connections/"
                      className={`sidemenu-link ${isActiveLink(
                        "/settings/connections/"
                      )}`}
                    >
                      Connections
                    </Link>
                  </li>

                  <li className="sidemenu-item">
                    <Link
                      to="/settings/privacy-policy/"
                      className={`sidemenu-link ${isActiveLink(
                        "/settings/privacy-policy/"
                      )}`}
                    >
                      Privacy Policy
                    </Link>
                  </li>

                  <li className="sidemenu-item">
                    <Link
                      to="/settings/terms-conditions/"
                      className={`sidemenu-link ${isActiveLink(
                        "/settings/terms-conditions/"
                      )}`}
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </AccordionDetails>
            </Accordion>

            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="sidebar-menu-link"
              style={{
                background: 'none',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 15px',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              {isLoading ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <i className="material-symbols-outlined">logout</i>
              )}
              <Typography component={"span"} className="title">
                {isLoading ? "Logging out..." : "Logout"}
              </Typography>
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftSidebarMenu;
