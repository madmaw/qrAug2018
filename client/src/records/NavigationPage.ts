export enum NavigationPage {
    HOME = 'navigation-page-home', 
    FAQ = 'navigation-page-faq'
}

export function toPath(navigationPage: NavigationPage): string {
    let result = '/';
    switch( navigationPage ) {
        case NavigationPage.FAQ:
            result = '/faqs';
            break;
    }
    return result;
}

export function fromPath(path: string): NavigationPage {
    let result = NavigationPage.HOME;
    if( path.indexOf('/faqs') == 0 ) {
        result = NavigationPage.FAQ;
    }
    return result;
}