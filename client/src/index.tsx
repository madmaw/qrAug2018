import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dispatcher } from "flux";
import 'bootstrap';

import { DataService } from "./service/DataService";
import { HomePage } from "./records/HomePage";
import { Action } from "./Action";
import {createAppContainer} from "./containers/AppContainer";
import { NavigationPage, fromPath } from "./records/NavigationPage";

let dataService = new DataService('/api');

// I don't like exported vars (singletons), create this and pass it as required instead
let dispatcher = new Dispatcher<Action>();
let appContainer = createAppContainer(dispatcher, dataService);

ReactDOM.render(
    React.createElement(appContainer),
    document.getElementById("example")
);

