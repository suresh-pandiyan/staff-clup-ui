"use client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import TableEventsContributors from "../../components_v2/tables/TableContributorsEvents";



const EventsContributors = () => {
    const { id } = useParams();
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Events Contributors Details</h5>

                <ul className="breadcrumb">
                    <li>
                        <Link to="/dashboard/">
                            <i className="material-symbols-outlined">home</i>
                            Dashboard
                        </Link>
                    </li>
                    <li>Events</li>
                    <li>Contributors</li>

                </ul>
            </div>

            <TableEventsContributors id={id} />

        </>
    );
};

export default EventsContributors;
