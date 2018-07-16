import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { Loaded, LoadedState } from "../records/Loaded";
import { HomePage } from "../records/HomePage";
import { toPath, NavigationPage } from "../records/NavigationPage";

export interface HomeViewProps {
    homePage: HomePage;
    onRequestNavigateToFAQ: () => void;
}

export function HomeView(props: HomeViewProps): React.ReactElement<any> {
    let onRequestNavigateToFAQ = function() {
        props.onRequestNavigateToFAQ();
    }
    let faqPath = toPath(NavigationPage.FAQ);
    return (
        <div>
            <h1 className="home-page-header">{props.homePage.heading}</h1>
            <h2 className="home-page-header">{props.homePage.subheading}</h2>
            <Link to={faqPath} onClick={onRequestNavigateToFAQ}>Frequently Asked Questions</Link>
            <p>
                <img src={props.homePage.heroImageUrl}></img>
            </p>
        </div>
    );
}