import * as React from "react";
import * as ReactDOM from "react-dom";

import { FAQSummary } from "../records/FAQSummary";
import { Loaded } from "../records/Loaded";
import { LoadingView } from "./LoadingView";
import { Link } from "react-router-dom";

export interface FAQViewProps {
    faqList: Loaded<FAQSummary[]>;
    onRequestLoadFAQList: () => void;
    onSelectFAQ: (id: any) => void;
    selectedFAQId?: any;
    selectedFAQDetail?: Loaded<string>;
}

export function FAQView(props: FAQViewProps): React.ReactElement<any> {
    function faqListViewPropsFactory(faqs: FAQSummary[]) {
        let result: FAQListViewProps = {
            faqs: faqs, 
            selectedFAQId: props.selectedFAQId, 
            onSelectFAQ: props.onSelectFAQ
        };
        return result;
    }

    function faqDetailViewPropsFactory(detail: string) {
        let result: FAQDetailViewProps = {
            faqDetail: detail
        }
        return result;
    }

    function onRequestLoadFAQDetail() {
        // should never get called
        console.warn('detail loaded, request should never happen');
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Frequently Asked Questions</h1>
            </div>
            <div className="col-md-6 vertical-separator-right">
                <LoadingView 
                    loaded={props.faqList} 
                    onRequestLoad={props.onRequestLoadFAQList} 
                    successView={FAQListView}
                    successViewPropsFactory={faqListViewPropsFactory}/>
            </div>
            <div className="col-md-6">
                <LoadingView
                    loaded={props.selectedFAQDetail}
                    onRequestLoad={onRequestLoadFAQDetail}
                    successView={FAQDetailView}
                    successViewPropsFactory={faqDetailViewPropsFactory}/>
            </div>
        </div>
    );
} 

interface FAQListViewProps {
    faqs: FAQSummary[];
    selectedFAQId: any;
    onSelectFAQ: (faqId: any) => void;
}

function FAQListView(props: FAQListViewProps): React.ReactElement<any> {
    return (
        <div>
            <ol>
                {
                    props.faqs.map(function(faq: FAQSummary) {
                        
                        let link: React.ReactElement<any>;
                        if( props.selectedFAQId == faq.id ) {
                            link = <b>{faq.title} &gt;</b>
                        } else {
                            let href = '#' + faq.id;
                            let onClick = function() {
                                props.onSelectFAQ(faq.id);
                            };
                            link = <Link to={href} replace onClick={onClick}>{faq.title}</Link>
                        }
                        return (
                            <li key={faq.id}>{link}</li>
                        );
                    })
                }
            </ol>
        </div>
    );
}

interface FAQDetailViewProps {
    faqDetail: string;
}

function FAQDetailView(props: FAQDetailViewProps): React.ReactElement<any> {
    return (
        <div dangerouslySetInnerHTML={{__html: props.faqDetail}}></div>
    )
}