import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import PlayList from "./components/playList";

const App = () => {
    return (
        <Provider store={store}>
            <PlayList />
        </Provider>
    );
};

export default App;
