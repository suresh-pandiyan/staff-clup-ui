import React from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { commonUndefinedLoadingStyles } from "../../components_v2/styles/commonStyles";
import TableDetailsEmergency from "../../components_v2/tables/TableDetailsEmergency";

const EmergencyViews = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Emergency Funds</h5>
                <ul className="breadcrumb">
                    <li>
                        <Link to="/dashboard/">
                            <i className="material-symbols-outlined">home</i>
                            Dashboard
                        </Link>
                    </li>
                    <li>Emergency Funds </li>
                    <li>Emergency Fund Details</li>
                </ul>
            </div>
            {/* Breadcrumb */}
            <React.Suspense fallback={
                <div style={commonUndefinedLoadingStyles}>
                    <CircularProgress variant="determinate" value={25} />
                </div>
            }>
                <TableDetailsEmergency />
            </React.Suspense>
        </>
    );
};

export default EmergencyViews;
