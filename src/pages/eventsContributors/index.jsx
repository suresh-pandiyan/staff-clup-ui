"use client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import TableEventsContributors from "../../components_v2/tables/TableContributorsEvents";
import { commonUndefinedLoadingStyles } from "../../components_v2/styles/commonStyles";
import { CircularProgress } from "@mui/material";

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
            <React.Suspense fallback={
                <div style={commonUndefinedLoadingStyles}>
                    <CircularProgress variant="determinate" value={25} />
                </div>
            }>
                <TableEventsContributors id={id} />
            </React.Suspense>
        </>
    );
};

export default EventsContributors;
