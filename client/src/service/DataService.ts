import { HomePage } from "../records/HomePage";
import { FAQSummary } from "../records/FAQSummary";



export class DataService {

    constructor(private url: string) {

    }

    async requestHomePage(): Promise<HomePage> {
        return this.query(
            {
                query: `{home{heading, subheading, heroImageUrl}}`
            }, 
            'home'
        );
    }

    async requestFAQSummaries(): Promise<FAQSummary[]> {
        return this.query(
            {
                query: `{faqs{title, id}}`
            }, 
            'faqs'
        );
    }

    async requestFAQBody(id: any): Promise<string> {
        return this.query(
            {
                query: `query body($id: ID){faq(id: $id){body}}`,
                variables: {id: id}
            }, 
            "faq", 
            "body"
        )
    }

    private async query(body: any, ...fields: string[]): Promise<any> {
        return fetch(
            this.url, 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                
                body: JSON.stringify(body)
            }
        ).then(function(response: Response) {
            if( response.ok ) {
                return response.json();
            } else {
                throw response.statusText;
            }
        }).then(function(data: any) {
            let result = data.data;
            for( let field of fields ) {
                if( result != null ) {
                    result = result[field];
                }
            }
            return result;
        });
    }
}