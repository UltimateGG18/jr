import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const PrivateShop=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            auth.ShopAuthentication===true?(
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/"></Redirect>
            )
        }
    />
)

PrivateShop.propTypes={
    auth:propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(PrivateShop);