
export interface HomePage {
    heading: string;
    subheading: string;
    heroImageUrl: string;
}

export interface Question {
    title: string;
    body: string;
}


export interface CMS {
    getHomePage(): HomePage;

    getFAQs(): Question[];

    getFAQ(index: number): Question;
}