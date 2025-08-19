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
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import NavList from "../NavList";

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
  orderID,
  productImage,
  productName,
  date,
  category,
  price,
  order,
  stock,
  amount,
  rating,
  status,
  detailsLink
) {
  return {
    orderID,
    productImage,
    productName,
    date,
    category,
    price,
    order,
    stock,
    amount,
    rating,
    status,
    detailsLink,
  };
}

const rows = [
  createData(
    "#JAN-999",
    "/images/products/product1.jpg",
    "Smart Band",
    "08 Jun 2024",
    "Watch",
    "$35.00",
    75,
    "750",
    "$2,625",
    "5.00 (141 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-998",
    "/images/products/product2.jpg",
    "Headphone",
    "07 Jun 2024",
    "Electronics",
    "$49.00",
    25,
    "825",
    "$1,225",
    "5.00 (69 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-996",
    "/images/products/product4.jpg",
    "Bluetooth Speaker",
    "05 Jun 2024",
    "Google",
    "$59.00",
    40,
    "535",
    "$2,360",
    "4.00 (75 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-997",
    "/images/products/product3.jpg",
    "iPhone 15 Plus",
    "06 Jun 2024",
    "Apple",
    "$99.00",
    55,
    "Stock Out",
    "$5,445",
    "5.00 (99 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-995",
    "/images/products/product5.jpg",
    "Airbuds 2nd Gen",
    "04 Jun 2024",
    "Headphone",
    "$79.00",
    56,
    "460",
    "$4,424",
    "5.00 (158 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-994",
    "/images/products/product1.jpg",
    "Smart Band",
    "08 Jun 2024",
    "Watch",
    "$35.00",
    75,
    "750",
    "$2,625",
    "5.00 (141 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-992",
    "/images/products/product3.jpg",
    "iPhone 15 Plus",
    "06 Jun 2024",
    "Apple",
    "$99.00",
    55,
    "Stock Out",
    "$5,445",
    "5.00 (99 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-991",
    "/images/products/product4.jpg",
    "Bluetooth Speaker",
    "05 Jun 2024",
    "Google",
    "$59.00",
    40,
    "535",
    "$2,360",
    "4.00 (75 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-993",
    "/images/products/product2.jpg",
    "Headphone",
    "07 Jun 2024",
    "Electronics",
    "$49.00",
    25,
    "825",
    "$1,225",
    "5.00 (69 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-990",
    "/images/products/product5.jpg",
    "Airbuds 2nd Gen",
    "04 Jun 2024",
    "Headphone",
    "$79.00",
    56,
    "460",
    "$4,424",
    "5.00 (158 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-989",
    "/images/products/product1.jpg",
    "Smart Band",
    "08 Jun 2024",
    "Watch",
    "$35.00",
    75,
    "750",
    "$2,625",
    "5.00 (141 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-988",
    "/images/products/product2.jpg",
    "Headphone",
    "07 Jun 2024",
    "Electronics",
    "$49.00",
    25,
    "825",
    "$1,225",
    "5.00 (69 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-987",
    "/images/products/product3.jpg",
    "iPhone 15 Plus",
    "06 Jun 2024",
    "Apple",
    "$99.00",
    55,
    "Stock Out",
    "$5,445",
    "5.00 (99 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-986",
    "/images/products/product4.jpg",
    "Bluetooth Speaker",
    "05 Jun 2024",
    "Google",
    "$59.00",
    40,
    "535",
    "$2,360",
    "4.00 (75 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-985",
    "/images/products/product5.jpg",
    "Airbuds 2nd Gen",
    "04 Jun 2024",
    "Headphone",
    "$79.00",
    56,
    "460",
    "$4,424",
    "5.00 (158 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-984",
    "/images/products/product1.jpg",
    "Smart Band",
    "08 Jun 2024",
    "Watch",
    "$35.00",
    75,
    "750",
    "$2,625",
    "5.00 (141 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-983",
    "/images/products/product2.jpg",
    "Headphone",
    "07 Jun 2024",
    "Electronics",
    "$49.00",
    25,
    "825",
    "$1,225",
    "5.00 (69 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-982",
    "/images/products/product3.jpg",
    "iPhone 15 Plus",
    "06 Jun 2024",
    "Apple",
    "$99.00",
    55,
    "Stock Out",
    "$5,445",
    "5.00 (99 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-981",
    "/images/products/product4.jpg",
    "Bluetooth Speaker",
    "05 Jun 2024",
    "Google",
    "$59.00",
    40,
    "535",
    "$2,360",
    "4.00 (75 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
  createData(
    "#JAN-980",
    "/images/products/product5.jpg",
    "Airbuds 2nd Gen",
    "04 Jun 2024",
    "Headphone",
    "$79.00",
    56,
    "460",
    "$4,424",
    "5.00 (158 reviews)",
    "Published",
    "/ecommerce/products-list/details/"
  ),
].sort((b, a) => (a.orderID < b.orderID ? -1 : 1));

const PublishedProducts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = rows.filter((row) =>
    row.productName.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page when searching
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
        <NavList />

        <Box>
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
                placeholder="Search product here....."
                value={searchTerm}
                onChange={handleSearch}
              />
            </Box>

            <Link to="/ecommerce/create-product/">
              <Button
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  borderRadius: "7px",
                  fontWeight: "500",
                  fontSize: "13px",
                  padding: "6px 13px",
                }}
                color="primary"
              >
                <AddIcon sx={{ position: "relative", top: "-1px" }} /> Add New
                Product
              </Button>
            </Link>
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
            <Table sx={{ minWidth: 1250 }} aria-label="Table">
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
                    Product
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Category
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Price
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Order
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Stock
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Amount
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Rating
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Status
                  </TableCell>

                  <TableCell className="text-black border-bottom">
                    Action
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
                    key={row.orderID}
                    sx={{
                      td: {
                        padding: "14px 20px",
                        fontSize: "14px",
                      },
                    }}
                  >
                    <TableCell className="border-bottom">
                      {row.orderID}
                    </TableCell>

                    <TableCell className="border-bottom">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: "13px",
                        }}
                      >
                        <Box sx={{ flexShrink: "0" }}>
                          <img
                            src={row.productImage}
                            alt="Product"
                            width={40}
                            height={40}
                            style={{ borderRadius: "7px" }}
                          />
                        </Box>

                        <Box>
                          <Link to={row.detailsLink}>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                fontWeight: "500",
                              }}
                              className="text-black"
                            >
                              {row.productName}
                            </Typography>
                          </Link>

                          <Typography
                            sx={{
                              fontSize: "13px",
                            }}
                            className="text-body"
                          >
                            {row.date}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.category}
                    </TableCell>

                    <TableCell
                      sx={{
                        padding: "14px 20px",
                        fontSize: "14px",
                      }}
                      className="text-black border-bottom"
                    >
                      {row.price}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.order}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.stock}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.amount}
                    </TableCell>

                    <TableCell className="text-black border-bottom">
                      {row.rating}
                    </TableCell>

                    <TableCell className="border-bottom">
                      <div className={`trezo-badge ${row.status}`}>
                        {row.status}
                      </div>
                    </TableCell>

                    <TableCell className="border-bottom">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Link to={row.detailsLink}>
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
                    <TableCell className="border-bottom" colSpan={10} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={10}
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
                    }}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
};

export default PublishedProducts;
