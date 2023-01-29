import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import React from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [searchProduct, setSearchProduct] = useState([]);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [searchCategory, setSearchCategory] = useState([]);
    const [msg, setMsg] = useState("");
    const [isDisabledP, setIsDisabledP] = useState(false);
    const [isDisabledC, setIsDisabledC] = useState(false);
    const { categoryList, setCategoryList } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("/api/products")
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    navigate("/login");
                }
            })
            .then((data) => {
                setProducts(data);
                console.log(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        fetch("/api/categories")
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw new Error("failed status");
                }
            })
            .then((data) => {
                setCategoryList(data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    const handleSearch = (e) => {
        setProductName(e.target.value);
    };

    const searchGFProduct = (e) => {
        e.preventDefault();
        fetch(`/api/search?q=${productName}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchCategory([]);
                setSearchProduct(data);
                console.log(searchProduct);
            })
            .catch((e) => {
                setMsg(e.res.data.msg);
                console.log(e);
            });
    };

    const searchGFCategory = (e) => {
        e.preventDefault();
        fetch(`/api/search/category?q=${category}`)
            .then((res) => res.json())
            .then((data) => {
                setSearchProduct([]);
                setSearchCategory(data);
                console.log(searchCategory);
            })
            .catch((e) => {
                setMsg(e.res.data.msg);
                console.log(e);
            });
    };

    const mystyle = {
        width: "12.5vw",
        height: "6vh",
        borderRadius: "5px",
        border: "1px solid darkGrey",
        border: "1px solid gray",
        backgroundColor: "transparent",
        color: "#5A5A5A",
        fontSize: "18px",
        fontFamily: "Bitter",
        paddingLeft: "10px",
    };

    if (products.length === 0) return null;

    let foundBySearchProduct = Array.isArray(searchProduct);
    let foundBySearchCategory = Array.isArray(searchCategory);
    let result;
    let error;
    if (!foundBySearchProduct || !foundBySearchCategory) {
        result = (
            <div>
                <p
                    style={{
                        marginLeft: "90vh",
                        fontSize: "24px",
                        fontWeight: "600",
                        marginTop: "10vh",
                    }}
                >
                    Nothing is found...
                </p>
            </div>
        );
        error = true;
    } else if (searchProduct.length === 0 && searchCategory.length === 0) {
        result = products;
    } else if (searchProduct.length) {
        result = searchProduct;
    } else {
        result = searchCategory;
    }
    if (!error) {
        result = result.map((item) => {
            return (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <img
                        src={item.url}
                        alt="product photo"
                        style={{ height: "200px" }}
                    />
                </div>
            );
        });
    }

    return (
        <>
            <div>
                <input
                    style={mystyle}
                    label="Product"
                    placeholder="Product"
                    name="search"
                    disabled={isDisabledP}
                    onChange={handleSearch}
                />
                <IconButton
                    aria-label="search"
                    variant="contained"
                    size="large"
                    onClick={searchGFProduct}
                >
                    <SearchIcon />
                </IconButton>
            </div>
            <div>
                <p
                    style={{
                        paddingTop: "20px",
                        marginLeft: "47vw",
                        textAlign: "start",
                    }}
                >
                    OR
                </p>
            </div>
            <div>
                <select
                    disabled={isDisabledC}
                    style={mystyle}
                    name="categoryId"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option defaultValue={true}>Choose category</option>
                    {categoryList
                        ? categoryList.map((item) => {
                              return (
                                  <option value={item.id}>{item.name}</option>
                              );
                          })
                        : ""}
                </select>
                <IconButton
                    aria-label="search"
                    variant="contained"
                    size="large"
                    onClick={searchGFCategory}
                >
                    <SearchIcon />
                </IconButton>
            </div>

            <div>
                <div className="list">{result}</div>
            </div>
        </>
    );
};

export default Products;
