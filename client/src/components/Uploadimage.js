import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const Uploadimage = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("1");
    const [selectedFile, setSelectedFile] = useState(null);
    const [successmessage, setSuccessmessage] = useState("");
    const [errormessage, setErrormessage] = useState(null);
    const { categoryList, setCategoryList } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/categories')
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

    const onChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = (e) => {
        e.preventDefault();

        let formData = new FormData();

        formData.append("name", name);
        formData.append("category", category);
        formData.append("file", selectedFile);

        console.log(name);
        console.log(category);
        console.log(selectedFile);

        axios
            .post('/api/uploadfile', formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                if (res.status === 200)
                    return setSuccessmessage("File uploaded successfully");
            })
            .catch((error) => {
                this.setErrormessage(
                    error.response.status + " Please select the file"
                );
            });
    };

    const myinputstyle = {
        width: "12.5vw",
        height: "6vh",
        borderRadius: "5px",
        border: "1px solid gray",
        backgroundColor: "transparent",
        color: "#5A5A5A",
        fontSize: "18px",
        paddingLeft: "10px",
        marginTop: "1vh",
    };

    const mystyle = {
        width: "12.5vw",
        height: "6vh",
        borderRadius: "5px",
        border: "1px solid gray",
        backgroundColor: "transparent",
        color: "#5A5A5A",
        fontSize: "18px",
        paddingLeft: "10px",
        marginTop: "0",
        marginBottom: "5vh",
    };

    const buttonstyle = {
        width: "8vw",
        height: "6vh",
        borderRadius: "5px",
        border: "1px solid gray",
        backgroundColor: "#70b04d",
        color: "black",
        fontWeigth: "600",
        fontSize: "16px",
        marginTop: "1vh",
        marginBottom: "9vh",
    };

    return (
        <div>
            <form method="post" action="#" onSubmit={uploadFile}>
                <input
                    style={myinputstyle}
                    label="Product"
                    placeholder="Product Name"
                    name="search"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <h4 style={{ margin: "5vh" }}>
                    Select category of the product
                </h4>
                <select
                    style={mystyle}
                    name="categoryId"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categoryList
                        ? categoryList.map((item) => {
                              return (
                                  <option value={item.id}>{item.name}</option>
                              );
                          })
                        : ""}
                </select>
                <div className="form-group files">
                    <h4>Upload Your File </h4>
                    <input
                        type="file"
                        name="uploadfile"
                        onChange={onChange}
                    ></input>
                    <p> {successmessage}</p>
                    <p>{errormessage}</p>
                    <button style={buttonstyle}>Upload</button>
                </div>
            </form>
        </div>
    );
};

export default Uploadimage;
