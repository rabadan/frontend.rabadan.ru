import { applyMiddleware, combineReducers, createStore } from "redux";
import AuthReducer from "./reducers/AuthReducer";
import MessageReducer from "./reducers/MessageReducer";
import BlogReducer from "./reducers/BlogReducer";
import reduxAxiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import HttpClientBuilder from "./services/HttpClientBuilder";

const rootReducer = combineReducers({
  AuthReducer,
  BlogReducer,
  MessageReducer
});

const axiosMiddleware = reduxAxiosMiddleware(HttpClientBuilder.fetchClient());

let middleware = applyMiddleware(
  axiosMiddleware,
  thunk,
);

const store = createStore(
  rootReducer,
  composeWithDevTools(middleware)
);

export default store;
