import { Express } from "express"
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import { CMS, HomePage } from "./cms";

// just alias the home page
type HomePageDTO = HomePage;

// define a new FAQ type 
interface FAQEntryDTO {
    id: any;
    title: string;
    body: string;
}


export function configureGraphQLAPI(app: Express, cms: CMS) {
    app.use('/api', graphqlHTTP({
        schema: buildSchema(`
            type Home {
                heading: String
                subheading: String
                heroImageUrl: String
            }

            type FAQEntry {
                id: ID
                title: String
                body: String
            }

            type Query {
                home: Home
                faqs: [FAQEntry]
                faq(id: ID): FAQEntry
            }
        `), 
        rootValue: {
            // just use the existing data
            home: cms.getHomePage() as HomePageDTO, 
            // add in an "id" value to our existing data (it's just the index)
            faqs: function(): FAQEntryDTO[] {
                let faqs = cms.getFAQs();
                let result: FAQEntryDTO[] = [];
                for( let id in faqs ) {
                    let faq = faqs[id];
                    result.push({
                        id: id, 
                        title: faq.title, 
                        body: faq.body
                    });
                }
                return result;
            }, 
            // look up a specific faq by id
            faq: function(args: {id: number}): FAQEntryDTO {
                let id = args.id;
                let entry = cms.getFAQ(id);
                if( entry ) {
                    return {
                        id: id, 
                        title: entry.title, 
                        body: entry.body
                    }
                }
            }
        },
        graphiql: process.env.NODE_ENV === 'development'
    }));

}