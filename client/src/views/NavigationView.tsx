import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import { NavigationPage, toPath } from "../records/NavigationPage";
import * as classNames from 'classnames';

export interface NavigationViewProps {
    page: NavigationPage, 
    onNavigate: (page: NavigationPage) => void
}

export function NavigationView(props: NavigationViewProps): React.ReactElement<any> {
    return (
        <div className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">Qantas CMS Exercise</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <NavigationTabView 
                        title="Home" 
                        currentPage={props.page} 
                        targetPage={NavigationPage.HOME} 
                        onNavigate={props.onNavigate}/>
                    <NavigationTabView 
                        title="FAQ" 
                        currentPage={props.page} 
                        targetPage={NavigationPage.FAQ} 
                        onNavigate={props.onNavigate}/>
                </ul>
            </div>
        </div>
    )
}

interface NavigationTabViewProps {
    title: string,
    currentPage: NavigationPage, 
    targetPage: NavigationPage, 
    onNavigate: (page: NavigationPage) => void
}

function NavigationTabView(props: NavigationTabViewProps): React.ReactElement<any> {
    let onNavigate = function() {
        props.onNavigate(props.targetPage);
    };
    let listItemClassnames = classNames(
        'nav-item',
        {active: props.targetPage == props.currentPage}
    )
    let anchorClassnames = classNames(
        'nav-link', 
        props.targetPage
    );
    let href = toPath(props.targetPage);
    return (
        <li className={listItemClassnames}>
            <Link to={href} className={anchorClassnames} onClick={onNavigate}>{props.title}</Link>
        </li>
    );
}