//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";   

//Form 

let BASE_URL;
if (process.env.NODE_ENV === 'development') {
    console.log('Running locally in development mode');
    BASE_URL = "http://127.0.0.1:5000"
  } else {
    console.log('not local')
    BASE_URL = "https://flask-hello-world-one-rosy.vercel.app"
  }
  
// Dashboard
export const GET_LATEST_TRANSACTION = BASE_URL +  "/order/latest-order"
export const GET_CARD_INFORMATION = BASE_URL +  "/dash/card-information" 
export const GET_NOTIFICATION = BASE_URL +  "/dash/notification" 
export const GET_TOP_SELLING = BASE_URL +  "/dash/top-selling" 


export const POST_ORDER = BASE_URL + "/order"
export const GET_ORDER = BASE_URL + "/order"
export const DELETED_ORDER = BASE_URL + "/order/delete-order"

//menu apis
export const GET_MENUS = BASE_URL + "/menus"
export const POST_MENU = BASE_URL + "/menus"
export const DELETED_MENU = BASE_URL + "/menus"
export const UPDATE_MENU = BASE_URL + "/menus/update"


//oorder apis
export const UPDATE_ORDERSTATUS = BASE_URL + "/order/edit-status"

//transaction
export const UPDATE_TRANSACTION = BASE_URL + "/transaction/edit-transaction"
export const GET_TRANSACTION = BASE_URL + "/transaction"

//delivery
export const GET_DELIVERY = BASE_URL + "/delivery"
export const UPDATED_DELIVERY = BASE_URL + "/delivery/edit-delivery"


    