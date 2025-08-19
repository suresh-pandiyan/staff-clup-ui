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
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Select from "@mui/material/Select";

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
        padding: "14px 20px",
      }}
    >
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{ borderRadius: "4px", padding: "4px" }}
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
        sx={{ borderRadius: "4px", padding: "4px" }}
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
  customerImg,
  customerName,
  date,
  noOrderReturned,
  noOrderRefunded,
  noOrderReplaced,
  totalRefunded,
  totalReplaced
) {
  return {
    id,
    customerImg,
    customerName,
    date,
    noOrderReturned,
    noOrderRefunded,
    noOrderReplaced,
    totalRefunded,
    totalReplaced,
  };
}

const initialRows = [
  createData(
    "#999",
    "/images/users/user1.jpg",
    "Olivia Clark",
    "19 Jun 2024",
    2,
    1,
    0,
    "$42.00",
    "$50.00"
  ),
  createData(
    "#998",
    "/images/users/user2.jpg",
    "Marcia Baker",
    "19 Jun 2024",
    1,
    1,
    0,
    "$32.00",
    "$54.00"
  ),
  createData(
    "#997",
    "/images/users/user3.jpg",
    "Carolyn Barnes",
    "20 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#996",
    "/images/users/user4.jpg",
    "Marcia Baker",
    "19 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#995",
    "/images/users/user5.jpg",
    "Donna Miller",
    "18 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#994",
    "/images/users/user6.jpg",
    "Barbara Cross",
    "17 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#993",
    "/images/users/user7.jpg",
    "Rebecca Blocks",
    "16 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#992",
    "/images/users/user8.jpg",
    "Ramiro McCarty",
    "15 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#991",
    "/images/users/user9.jpg",
    "Robert Fairweather",
    "14 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#990",
    "/images/users/user10.jpg",
    "Marcelino Haddock",
    "13 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#989",
    "/images/users/user11.jpg",
    "Thomas Wilson",
    "12 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#988",
    "/images/users/user12.jpg",
    "Thomas Wilson",
    "11 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#987",
    "/images/users/user13.jpg",
    "Marcelino Haddock",
    "10 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#986",
    "/images/users/user14.jpg",
    "Robert Fairweather",
    "9 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#985",
    "/images/users/user15.jpg",
    "Ramiro McCart",
    "8 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
  createData(
    "#984",
    "/images/users/user16.jpg",
    "Rebecca Block",
    "7 Jun 2024",
    2,
    4,
    7,
    "$42.00",
    "$56.00"
  ),
].sort((b, a) => (a.id < b.id ? -1 : 1));

const RefundsTable = () => {
  const [select, setSelect] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // For dynamic search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter rows based on the search term
  const filteredRows = initialRows.filter(
    (row) =>
      row.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
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
            display: { xs: "block", sm: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: "25px",
          }}
        >
          <Box
            component="form"
            className="t-search-form"
            sx={{
              width: "265px",
            }}
          >
            <label>
              <i className="material-symbols-outlined">search</i>
            </label>
            <input
              type="text"
              className="t-input"
              placeholder="Search here....."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <Box>
            <FormControl sx={{ minWidth: 115 }} size="small">
              <InputLabel id="demo-select-small">Select</InputLabel>
              <Select
                labelId="demo-select-small"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                className="select"
              >
                <MenuItem value={0}>This Day</MenuItem>
                <MenuItem value={0}>This Week</MenuItem>
                <MenuItem value={1}>This Month</MenuItem>
                <MenuItem value={2}>This Year</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "none",
            borderRadius: "7px",
          }}
          className="rmui-table border"
        >
          <Table sx={{ minWidth: 1200 }} aria-label="Table">
            <TableHead className="bg-f6f7f9">
              <TableRow
                sx={{
                  th: {
                    fontWeight: "500",
                    padding: "10px 20px",
                    fontSize: "14px",
                  },
                }}
              >
                <TableCell className="text-black border-bottom">ID</TableCell>

                <TableCell className="text-black border-bottom">
                  Customer
                </TableCell>

                <TableCell className="text-black border-bottom">Date</TableCell>

                <TableCell className="text-black border-bottom text-end">
                  No. Order Returned
                </TableCell>

                <TableCell className="text-black border-bottom text-end">
                  No. Order Refunded
                </TableCell>

                <TableCell className="text-black border-bottom text-end">
                  No. Order Replaced
                </TableCell>

                <TableCell className="text-black border-bottom text-end">
                  Total Refunded
                </TableCell>

                <TableCell className="text-black border-bottom text-end">
                  Total Replaced
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : filteredRows
              ).map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    td: {
                      padding: "14px 20px",
                      fontSize: "14px",
                    },
                  }}
                >
                  <TableCell className="border-bottom">{row.id}</TableCell>

                  <TableCell className="text-black border-bottom">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "13px",
                      }}
                    >
                      <Box sx={{ flexShrink: "0" }}>
                        <img
                          src={row.customerImg}
                          alt="Product"
                          width={40}
                          height={40}
                          style={{ borderRadius: "100px" }}
                        />
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontSize: { xs: "14px", sm: "15px" },
                            fontWeight: "500",
                          }}
                          className="text-black"
                        >
                          {row.customerName}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell className="border-bottom">{row.date}</TableCell>

                  <TableCell className="border-bottom text-end">
                    {row.noOrderReturned}
                  </TableCell>

                  <TableCell className="border-bottom text-end">
                    {row.noOrderRefunded}
                  </TableCell>

                  <TableCell className="border-bottom text-end">
                    {row.noOrderReplaced}
                  </TableCell>

                  <TableCell className="border-bottom text-end">
                    {row.totalRefunded}
                  </TableCell>

                  <TableCell className="border-bottom text-end">
                    {row.totalReplaced}
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className="border-bottom" colSpan={8} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={8}
                  count={filteredRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                    border: "none",
                  }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default RefundsTable;
