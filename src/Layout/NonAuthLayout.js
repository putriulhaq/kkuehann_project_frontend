import React from 'react';
import PropTypes from 'prop-types';
import withRouter from "../components/Common/withRouter";
import { Navigate, Outlet } from 'react-router-dom';

const NonAuthLayout = (props) => {

    const isAuthenticated = localStorage.getItem('authToken');
    // if (!isAuthenticated && loading) {
    //   return (
    //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    //   );
    // }
    // return <>{props.children}</>;
    return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet/>;
    <Outlet/>
};

NonAuthLayout.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object
};

export default withRouter(NonAuthLayout);
