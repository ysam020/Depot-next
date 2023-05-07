import React, { useEffect, useState } from "react";
import { AddtoCart } from "../../actions/cartAction";
import Link from "next/link";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";

function ProductDetailsComponent() {
  const [data, setData] = useState([]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const router = useRouter();
  const url = router.query.productDetails;

  useEffect(() => {
    const fetchProduct = async (params) => {
      const response = await fetch(`/api/products/${params}`);
      const apiData = await response.json();
      setData(apiData);
    };

    fetchProduct(url);
  }, [url]);

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartReducer);

  const StyledTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
    />
  ))({
    "& .MuiTabs-indicator": {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
    "& .MuiTabs-indicatorSpan": {
      maxWidth: 40,
      width: "100%",
    },
  });

  const StyledTab = styled((props) => <Tab {...props} />)(({ theme }) => ({
    textTransform: "none",
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    backgroundColor: "#fff",
    color: "#000",
    "&.Mui-selected": {
      color: "#fff",
      backgroundColor: "#000",
    },
  }));

  return (
    <>
      {data.length === 0 ? (
        ""
      ) : (
        <Container className="product-details-page">
          <Row>
            <Col xs={12} lg={6} className="product-details-left-col">
              <Image
                src={data[0]?.image}
                alt=""
                width="500"
                height="500"
                priority
              />
            </Col>
            <Col xs={12} lg={6} className="product-details-right-col">
              <h2>{data[0].title}</h2>
              <h5>{`$ ${data[0].price.toFixed(2)}`}</h5>
              <Rating value={data[0].rating.rate} />

              <p className="product-short-description">
                {data[0].shortDescription}
              </p>

              <p className="product-info">
                <span className="product-info-heading">
                  CATEGORY: {data[0].category.toUpperCase()}
                </span>
                <br />
                <span className="product-info-heading">SKU: {data[0].sku}</span>
                <br />
                <span className="product-info-heading">
                  Tags: {data[0].tags.toString()}
                </span>
              </p>

              <br />
              {cartData.some((p) => p.id === data[0].id) ? (
                <Link href="/cart" className="go-to-cart">
                  Go to Cart
                </Link>
              ) : (
                <button
                  aria-label="add-to-cart"
                  onClick={() =>
                    dispatch(
                      AddtoCart({
                        id: data[0].id,
                        price: data[0].price,
                        title: data[0].title,
                        image: data[0].image,
                        qty: 1,
                      })
                    )
                  }
                  className="add-to-cart"
                >
                  Add to Cart
                </button>
              )}
            </Col>
          </Row>

          <div className="additional-info">
            <Box
              sx={{
                width: "100%",
                typography: "body1",
                border: "1px solid #e1e1e1",
              }}
            >
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "#e1e1e1",
                  }}
                >
                  <StyledTabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs example"
                  >
                    <StyledTab label="Description" value="1" />
                    <StyledTab label="Additional Information" value="2" />
                  </StyledTabs>
                </Box>
                <Box sx={{ padding: "30px 0" }}>
                  <TabPanel value="1">
                    <h3>Description</h3>
                    {data[0].description}
                  </TabPanel>
                  <TabPanel value="2">
                    <h3>Additional Information</h3>
                    <span className="product-info-heading">
                      Weight: {data[0].weight}
                    </span>
                    <br />
                    <span className="product-info-heading">
                      Dimensions: {data[0].dimensions}
                    </span>
                    <br />
                    <span className="product-info-heading">
                      Color: {data[0].color}
                    </span>
                    <br />
                    <span className="product-info-heading">
                      Material: {data[0].material}
                    </span>
                    <br />
                  </TabPanel>
                </Box>
              </TabContext>
            </Box>
          </div>
        </Container>
      )}
    </>
  );
}

export default ProductDetailsComponent;
