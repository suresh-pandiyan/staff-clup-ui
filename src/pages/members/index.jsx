import React from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import TableMembers from "../../components_v2/tables/TableMembers";

const Members = () => {
    return (
        <>
            {/* Breadcrumb */}
            <div className="breadcrumb-card">
                <h5>Members</h5>

                <ul className="breadcrumb">
                    <li>
                        <Link to="/dashboard">

                            <i className="material-symbols-outlined">home</i>
                            Dashboard
                        </Link>
                    </li>
                    <li>Members</li>
                </ul>
            </div>

            <TableMembers />
        </>
    );
};

export default Members;
