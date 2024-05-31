import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../View/context/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
    // const { user } = useAuth();
    const userId = localStorage.getItem('userId');

    return userId ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
