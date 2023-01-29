import { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import Information from "./Information";

const Home = (props) => {
    const { token, setToken } = useContext(AppContext);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            console.log("token home=>", token);
            const decode = jwt_decode(token);
            const expire = decode.exp;
            console.log(expire * 1000);
            console.log(new Date().getTime());
            if (expire * 1000 < new Date().getTime()) {
                navigate("/login");
            }
        } catch (e) {
            console.log(e);
            setToken(null);
            navigate("/login");
        }
    }, [token]);
    return (
        <div>
            <Information />
        </div>
    );
};

export default Home;
