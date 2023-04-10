import React from "react";
import { TitleProps } from "@refinedev/core";
import { Link } from "react-router-dom";

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
    <Link to="/">
        {collapsed ? ( 
            <img
                src={"/images/logo-collapsed.png"}
                alt="Gueule Tapée - Fass - Colobane Admin"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 24px",
                }}
            />
        ) : (
            <div
              style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
              }}
            >
            <img
                src={"/images/logo.png"}
                alt="Gueule Tapée - Fass - Colobane Admin"
                style={{
                    width: "200px"
                }}
            />
            </div>
        )}
    </Link>
);
