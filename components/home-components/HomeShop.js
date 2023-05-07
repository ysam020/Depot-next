import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import Snackbar from "@mui/material/Snackbar";
import Link from "next/link";
import { AddtoCart } from "../../actions/cartAction";
import { Tooltip } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

function HomeShop() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const apiData = await response.json();
      setData(apiData);
    };

    fetchProducts();
  }, []);

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 8;
  const pagesVisited = pageNumber * productsPerPage;
  const pageCount = Math.ceil(data.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayProducts = data
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((products) => {
      const { id, title, price, image, rating } = products;

      return (
        <Col lg={3} sm={6} xs={12} key={id} className="product-col">
          <Link href={`/product/${id}`}>
            <div className="product-img">
              <Image
                src={image}
                alt="product-img"
                width="300"
                height="300"
                priority
              />
            </div>
          </Link>
          <div className="product-details">
            <Tooltip title={title}>
              <h5>{title}</h5>
            </Tooltip>
            <p>{`$ ${price}`}</p>
            <Rating
              name="read-only"
              value={rating.rate}
              readOnly
              className="product-rating"
            />
            {cartData.some((product) => product.id === products.id) ? (
              <Link href="/cart">Go to Cart</Link>
            ) : (
              <button
                onClick={() => {
                  dispatch(
                    AddtoCart({
                      id: products.id,
                      price: products.price,
                      title: products.title,
                      image: products.image,
                      qty: 1,
                    })
                  );
                  handleOpenSnackbar();
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </Col>
      );
    });

  return (
    <>
      <Container className="home-shop" id="home-shop">
        <Row>
          {displayProducts}

          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={`paginationBttns page-count-${pageCount}`}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </Row>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="Added to cart"
      />
      ;
    </>
  );
}

export default HomeShop;
