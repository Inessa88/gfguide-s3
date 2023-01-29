import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const { pathname } = useLocation();
    return (
        <div
            style={{
                position: pathname === "/" ? "relative" : "fixed",
                height: "10vh",
                color: "#333333",
                padding: "2vh 0 2vh 0",
                bottom: "0",
                width: "100%",
                left: "0",
                right: "0",
                backgroundColor: "#70b04d",
                marginRight: "-20px",
            }}
        >
            <h4>Created by Inessa Petrova</h4>
            <p>Copyright ©2022 </p>
        </div>
    );
};
export default Footer;
