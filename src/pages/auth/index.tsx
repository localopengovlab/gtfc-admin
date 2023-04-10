import * as React from "react";
import { AuthPage as AntdAuthPage, AuthProps } from "@refinedev/antd";

import { Image } from "antd";


import { Link } from "react-router-dom";

const authWrapperProps = {
    style: {
        backgroundImage: "url('/bg.png')",
        backgroundRepeat: "repeat-x",
    },
};

const contentProps = {};

const renderAuthContent = (content: React.ReactNode) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Link to="/" style={{ marginBottom: "32px" }}>
                <Image
                    height="160"
                    src="./images/logo.png"
                    alt="Gueule Tapée - Fass - Colobane"
                    preview={false}
                />
            </Link>
            {content}
        </div>
    );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps, ...rest }) => {
    return (
        <AntdAuthPage
            type={type}
            wrapperProps={authWrapperProps}
            contentProps={contentProps}
            renderContent={renderAuthContent}
            formProps={formProps}
            {...rest}
        />
    );
};
