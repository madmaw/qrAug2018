import { HomePage, Question } from "../cms";

export interface Domain {
    homepage: HomePage, 
    faqs: Question[]
}


export class InMemoryCMS {
    constructor(private data: Domain) {

    }

    public getHomePage(): HomePage {
        return this.data.homepage;
    }

    public getFAQs(): Question[] {
        return this.data.faqs;
    }

    public getFAQ(index: number): Question {
        return this.data.faqs[index];
    }
}