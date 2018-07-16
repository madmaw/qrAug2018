import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Route, match } from "react-router-dom";

import { NavigationView } from "./NavigationView";
import { NavigationPage } from "../records/NavigationPage";
import { HomePageStore } from "../stores/HomePageStore";
import { Loaded } from "../records/Loaded";
import { HomePage } from "../records/HomePage";
import { HomeView, HomeViewProps } from "./HomeView";
import { LoadingView } from "./LoadingView";
import { FAQView } from "./FAQView";
import { FAQSummary } from "../records/FAQSummary";

export interface AppViewProps {
    page: NavigationPage, 
    onNavigate: (page: NavigationPage) => void, 
    homePage: Loaded<HomePage>, 
    faqList: Loaded<FAQSummary[]>,
    selectedFAQId: any,
    onRequestLoadHomePage: () => void, 
    onRequestLoadFAQList: () => void,
    selectedFAQDetail: Loaded<string>,
    onSelectFAQ: (faqId: any) => void
}

export function AppView(props: AppViewProps): React.ReactElement<any> {

    function home(match: match<any>) {
        let homeViewPropsFactory = (homePage:HomePage) => {
            let result: HomeViewProps = {
                homePage: homePage, 
                onRequestNavigateToFAQ: function() {
                    // just proxy this
                    props.onNavigate(NavigationPage.FAQ);
                }
            };
            return result;
        }
        return (
            <LoadingView 
                loaded={props.homePage} 
                onRequestLoad={props.onRequestLoadHomePage} 
                successView={HomeView}
                successViewPropsFactory={homeViewPropsFactory}/>
        );
    }

    function faqs(match: match<any>) {
        return (
            <FAQView
                faqList={props.faqList}
                onRequestLoadFAQList={props.onRequestLoadFAQList}
                onSelectFAQ={props.onSelectFAQ}
                selectedFAQId={props.selectedFAQId}
                selectedFAQDetail={props.selectedFAQDetail}/>
        );
    }

    return (        
        <BrowserRouter>
            <div>
                <NavigationView page={props.page} onNavigate={props.onNavigate}/>
                <div className="col-12">
                    <Route path="/" exact component={home}/>
                    <Route path="/faqs" component={faqs}/>
                </div>
            </div>

        </BrowserRouter>
    );
}

