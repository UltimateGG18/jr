import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const PublicCus=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            auth.userAuthenticate==false && auth.adminAuthentication==false && auth.ShopAuthentication==false?<Component {...props}></Component>:
            (auth.userAuthenticate==true?<Redirect to="/Dashboard"></Redirect>:(auth.adminAuthentication==true?<Redirect to="/AdmDashboard"></Redirect>:(auth.ShopAuthentication==true?<Redirect to="/ShopDashboard"></Redirect>:"")))
                

        }
    />
)

PublicCus.propTypes={
    auth:propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps)(PublicCus);