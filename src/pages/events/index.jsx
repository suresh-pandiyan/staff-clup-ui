import React from "react";
import { Link } from "react-router-dom";
import EventsGrid from "../../components/Events/EventsGrid";
import TableEvents from "../../components_v2/tables/TableEvents";

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
      <TableEvents />
    </>
  );
};

export default Events;
