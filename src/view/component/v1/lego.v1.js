import { Router, Route } from "wouter";

import { SinglePageApplication, Application } from './app/app.v1.module';
import PageView from './page/page.v1.module';
import { SideNavi, SideNavBoard } from './navi/navi.v1.module';
import Toolbar from './toolbar/toolbar.v1.module';


const mapping = {
    Application,
    SinglePageApplication,
    Router,
    Route,
    PageView,
    SideNavi,
    SideNavBoard,
    Toolbar,
};

export default mapping;