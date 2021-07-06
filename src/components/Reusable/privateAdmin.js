import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateAdmin=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            auth.adminAuthentication==true?(
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/"></Redirect>
            )
        }
    />
)

PrivateAdmin.propTypes={
    auth:propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateAdmin);