import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AppContext } from "../App";

const LoginRegisterForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");

    const { setToken } = useContext(AppContext);

    const navigate = useNavigate();
    const handleClick = async () => {
        if (props.title === "Login") {
            try {
                const response = await axios.post(
                    "/api/login",
                    {
                        email,
                        password,
                    },
                    {
                        headers: {
                            Content_Type: "application/json",
                        },
                    }
                );
                console.log(response.data);
                setToken(response.data.token);
                navigate("/");
            } catch (e) {
                console.log(e.response.data);
                setMsg(e.response.data.msg);
            }
        } else {
            try {
                const response = await axios.post(
                    "/api/register",
                    {
                        email,
                        password,
                    },
                    {
                        headers: {
                            Content_Type: "application/json",
                        },
                    }
                );
                console.log(response.data);
                setMsg("");
                navigate("/login");
            } catch (e) {
                setMsg(e.response.data.msg);
            }
        }
    };

    return (
        <div>
            <div>
                <h3>{props.title} Form</h3>
            </div>
            <Box
                component={"form"}
                sx={{ m: 1 }}
                noValidate
                autoComplete={"off"}
            >
                <TextField
                    sx={{ m: 1 }}
                    id="email"
                    label="Enter Email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{ m: 1 }}
                    id="password"
                    label="Enter Password"
                    variant="outlined"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button
                sx={{ mb: "62vh" }}
                variant="contained"
                onClick={handleClick}
            >
                {props.title}
            </Button>
            <div>{msg}</div>
        </div>
    );
};

export default LoginRegisterForm;
