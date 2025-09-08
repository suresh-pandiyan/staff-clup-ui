import React from "react";
import { Link } from "react-router-dom";
import TableEvents from "../../components_v2/tables/TableEvents";
import { CircularProgress } from "@mui/material";
import { commonUndefinedLoadingStyles } from "../../components_v2/styles/commonStyles";

const Events = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="breadcrumb-card">
        <h5>Events</h5>
        <ul className="breadcrumb">
          <li>
            <Link to="/dashboard/">
              <i className="material-symbols-outlined">home</i>
              Dashboard
            </Link>
          </li>
          <li>Events</li>

        </ul>
      </div>
      <React.Suspense fallback={
        <div style={commonUndefinedLoadingStyles}>
          <CircularProgress variant="determinate" value={25} />
        </div>
      }>
        <TableEvents />
      </React.Suspense>
    </>
  );
};

export default Events;
