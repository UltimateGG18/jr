import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const authLogin=(obj, history)=>{
    return (dispatch)=>{
        axios.post("http://3.129.92.172:5000/login",obj)
        .then(res=>{
            if(res.status==200){
                console.log(res.data)
                const {tokan}= res.data;  
                const userData=jwtDecode(tokan);
                if(userData.userType=="Customer")
                {
                    dispatch(userLoginSuccess(userData))
                    localStorage.setItem('user',tokan);
                    history.push("/Dashboard");
                }else if(userData.userType=="Shopkeeper"){
                    dispatch(shopKeeperLogin(userData))
                    localStorage.setItem('shopkeeper',tokan);
                    history.push("/ShopDashboard");
                }else if(userData.userType=="Admin"){
                    dispatch(adminLogin(userData))
                    localStorage.setItem('admin',tokan);
                    history.push("/AdmDashboard");
                }
            }
        })
        .catch(err=>{
            dispatch(onLoginFailure(err.response.data.msg))
        })
    }
}
export const userLoginSuccess=(user)=>{
    return {
        type:'USER_LOGIN_SUCCESS',
        payload:user
    }
}
export const shopKeeperLogin=(shopkeeper)=>{
    return {
        type:'SHOP_LOGIN_SUCCESS',
        payload:shopkeeper
    }
}
export const adminLogin=(admin)=>{
    return {
        type:'ADMIN_LOGIN_SUCCESS',
        payload:admin
    }
}
export const onLoginFailure=(msg)=>{
    return {
        type:"ON_LOGIN_FAILURE",
        payload:msg
    }
}
export const onLogout=(history)=>{
    return (dispatch)=>{
                localStorage.removeItem('user');
                localStorage.removeItem('shopkeeper');
                localStorage.removeItem('admin');
                dispatch(userLogoutSuccess());
                history.push("/");
    }
}
export const userLogoutSuccess=()=>{
    return {
        type:'USER_LOGOUT_SUCCESS',
    }
}

export const OtpLogin=(obj, history)=>{
    return (dispatch)=>{
        axios.post("http://3.129.92.172:5000/UserCheck",obj)
        .then(res=>{
            if(res.status==200){
                console.log(res.data)
                const {tokan}= res.data;  
                const userData=jwtDecode(tokan);
                if(userData.userType=="tempCustomer" || userData.userType=="Customer" )
                {
                    dispatch(userLoginSuccess(userData))
                    localStorage.setItem('user',tokan);
                    history.push("/Dashboard");
                }else if(userData.userType=="Shopkeeper"){
                    dispatch(shopKeeperLogin(userData))
                    localStorage.setItem('shopkeeper',tokan);
                    history.push("/ShopDashboard");
                }else if(userData.userType=="Admin"){
                    dispatch(adminLogin(userData))
                    localStorage.setItem('admin',tokan);
                    history.push("/AdmDashboard");
                }
            }
        })
        .catch(err=>{
            dispatch(onLoginFailure(err.response.data.msg))
        })
    }
}