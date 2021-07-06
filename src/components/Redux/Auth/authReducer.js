const intialState={
    userAuthenticate:false,
    ShopAuthentication:false,
    adminAuthentication:false,
    Shopkeeper:{},
    Admin:{},
    user:{},
    error:null,
}

export default function(state=intialState, action){
    switch(action.type){
        case "USER_LOGIN_SUCCESS":
            return {
                ...state,
                userAuthenticate:true,
                user:action.payload,
                error:null
            }
        case "SHOP_LOGIN_SUCCESS":
            return {
                ...state,
                ShopAuthentication:true,
                Shopkeeper:action.payload,
                error:null
            }
        case "ADMIN_LOGIN_SUCCESS":
            return {
                ...state,
                adminAuthentication:true,
                Admin:action.payload,
                error:null
            }
        case "USER_LOGOUT_SUCCESS":
            return {
                ...state,
                userAuthenticate:false,
                ShopAuthentication:false,
                adminAuthentication:false,
                user:{},
                Shopkeeper:{},
                Admin:{}
        }
        case "ON_LOGIN_FAILURE":
            return {
                ...state,
                error:action.payload,
            }
           
            default:
                return state;
    }
}