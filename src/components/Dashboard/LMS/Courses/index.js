"use client";

import React, { useState } from "react";
import {
  Card,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  TableHead,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CustomDropdown from "./CustomDropdown";

function TablePaginationActions({ count, page, rowsPerPage, onPageChange }) {
  const theme = useTheme();

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box
      sx={{
        flexShrink: 0,
        display: "flex",
        gap: "10px",
        padding: "0 20px",
      }}
    >
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{
          borderRadius: "4px",
          padding: "4px",
        }}
        className="border"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>

      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{
          borderRadius: "4px",
          padding: "4px",
        }}
        className="border"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
    </Box>
  );
}

function createData(
  id,
  courseName,
  courseDetailsLink,
  category,
  instructorImg,
  instructorName,
  enrolled,
  startDate,
  endDate,
  price
) {
  return {
    id,
    courseName,
    courseDetailsLink,
    category,
    instructorImg,
    instructorName,
    enrolled,
    startDate,
    endDate,
    price,
  };
}

const rows = [
  createData(
    "#854",
    "Cybersecurity Awareness",
    "/lms/courses/details/",
    "Technology",
    "/images/users/user6.jpg",
    "Oliver Khan",
    180,
    "25 Mar 2024",
    "25 Apr 2024",
    49.99
  ),
  createData(
    "#855",
    "Python Programming",
    "/lms/courses/details/",
    "Science",
    "/images/users/user7.jpg",
    "Ava Cooper",
    250,
    "20 Mar 2024",
    "20 Apr 2024",
    45.32
  ),
  createData(
    "#856",
    "Big Data Analytics",
    "/lms/courses/details/",
    "Health & Wellness",
    "/images/users/user8.jpg",
    "Isabella Evans",
    320,
    "15 Mar 2024",
    "15 Apr 2024",
    99.0
  ),
  createData(
    "#857",
    "Introduction to Blockchain",
    "/lms/courses/details/",
    "Education",
    "/images/users/user9.jpg",
    "Mia Hughes",
    135,
    "11 Mar 2024",
    "11 Apr 2024",
    29.75
  ),
  createData(
    "#858",
    "Network Administration",
    "/lms/courses/details/",
    "Food & Cooking",
    "/images/users/user10.jpg",
    "Noah Mitchell",
    460,
    "5 Mar 2024",
    "5 Apr 2024",
    56.99
  ),
  createData(
    "#859",
    "Artificial Intelligenc",
    "/lms/courses/details/",
    "Lifestyle & Fashion",
    "/images/users/user11.jpg",
    "Oliver Khan",
    515,
    "10 Feb 2024",
    "10 Mar 2024",
    49.99
  ),
  createData(
    "#860",
    "Network Administration",
    "/lms/courses/details/",
    "Food & Cooking",
    "/images/users/user10.jpg",
    "Noah Mitchell",
    460,
    "05 Feb 2024",
    "05 Mar 2024",
    49.99
  ),
  createData(
    "#861",
    "Introduction to Blockchain",
    "/lms/courses/details/",
    "Education",
    "/images/users/user9.jpg",
    "Mia Hughes",
    135,
    "10 Mar 2024",
    "10 Mar 2024",
    29.75
  ),
  createData(
    "#862",
    "Big Data Analytics",
    "/lms/courses/details/",
    "Health & Wellness",
    "/images/users/user8.jpg",
    "Isabella Evans",
    320,
    "15 Mar 2024",
    "15 Mar 2024",
    99.0
  ),
  createData(
    "#863",
    "Python Programming",
    "/lms/courses/details/",
    "Science",
    "/images/users/user7.jpg",
    "Ava Cooper",
    250,
    "20 Mar 2024",
    "20 Mar 2024",
    45.32
  ),
  createData(
    "#864",
    "Cybersecurity Awareness",
    "/lms/courses/details/",
    "Technology",
    "/images/users/user6.jpg",
    "Oliver Khan",
    180,
    "25 Mar 2024",
    "25 Mar 2024",
    49.99
  ),
].sort((b, a) => (a.id < b.id ? -1 : 1));

const Courses = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: "7px",
        mb: "25px",
        padding: { xs: "18px", sm: "20px", lg: "25px" },
      }}
      className="rmui-card"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "25px",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "16px", md: "18px" },
            fontWeight: 700,
          }}
          className="text-black"
        >
          Courses
        </Typography>

        <Box>
          <CustomDropdown
            options={["Paid", "Free", "Top Rated", "Best Seller"]}
            onSelect={(value) => console.log(value)}
            defaultLabel="All Courses"
          />
        </Box>
      </Box>

      <Box sx={{ marginLeft: "-25px", marginRight: "-25px" }}>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: "none", borderRadius: "0" }}
          className="rmui-table"
        >
          <Table sx={{ minWidth: 1200 }} aria-label="Courses Table">
            <TableHead className="bg-primary-50">
              <TableRow
                sx={{
                  th: {
                    fontWeight: "500",
                    padding: "10px 24px",
                    fontSize: "14px",
                  },
                }}
              >
                <TableCell className="text-black border-bottom">ID</TableCell>
                <TableCell className="text-black border-bottom">
                  Course Name
                </TableCell>
                <TableCell className="text-black border-bottom">
                  Category
                </TableCell>
                <TableCell className="text-black border-bottom">
                  Instructor
                </TableCell>
                <TableCell className="text-black border-bottom">
                  Enrolled
                </TableCell>
                <TableCell className="text-black border-bottom">
                  Start Date
                </TableCell>
                <TableCell className="text-black border-bottom">
                  End Date
                </TableCell>
                <TableCell className="text-black border-bottom">
                  Price
                </TableCell>
                <TableCell className="text-black border-bottom">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    td: {
                      padding: "15px 20px",
                      fontSize: "14px",
                    },
                  }}
                >
                  <TableCell className="border-bottom">{row.id}</TableCell>

                  <TableCell className="text-black border-bottom" sx={{ fontWeight: "500" }}>
                    {row.courseName}
                  </TableCell>

                  <TableCell className="border-bottom">
                    {row.category}
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Box sx={{ flexShrink: "0" }}>
                        <img
                          src={row.instructorImg}
                          alt="Instructor"
                          width={40}
                          height={40}
                          style={{ borderRadius: "100px" }}
                        />
                      </Box>
                      <Typography sx={{ fontWeight: "500" }}>
                        {row.instructorName}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell className="border-bottom">
                    {row.enrolled}
                  </TableCell>

                  <TableCell className="border-bottom">
                    {row.startDate}
                  </TableCell>

                  <TableCell className="border-bottom">{row.endDate}</TableCell>

                  <TableCell className="border-bottom">
                    ${row.price.toFixed(2)}
                  </TableCell>

                  <TableCell className="border-bottom">
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Link to={row.courseDetailsLink}>
                        <IconButton
                          aria-label="view"
                          color="primary"
                          sx={{ padding: "5px" }}
                        >
                          <i
                            className="material-symbols-outlined"
                            style={{ fontSize: "16px" }}
                          >
                            visibility
                          </i>
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="edit"
                        color="secondary"
                        sx={{ padding: "5px" }}
                      >
                        <i
                          className="material-symbols-outlined"
                          style={{ fontSize: "16px" }}
                        >
                          edit
                        </i>
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        sx={{ padding: "5px" }}
                      >
                        <i
                          className="material-symbols-outlined"
                          style={{ fontSize: "16px" }}
                        >
                          delete
                        </i>
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className="border-bottom" colSpan={9} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={9}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    border: "none",

                    ".MuiToolbar-root": {
                      minHeight: "auto",
                      marginTop: "15px",
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Card>
  );
};

export default Courses;
