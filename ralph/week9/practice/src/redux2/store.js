import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./id";
import titleReducer from "./title";
import searchReducer from "./search";
import contentReducer from "./content";
export default configureStore({
    reducer: {
        id: idReducer,
        title: titleReducer,
        content: contentReducer,
        search: searchReducer,
    },
});
