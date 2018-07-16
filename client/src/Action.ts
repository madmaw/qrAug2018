import { NavigationPage } from "./records/NavigationPage";
import { HomePage } from "./records/HomePage";
import { FAQSummary } from "./records/FAQSummary";

export enum ActionType {
    NAVIGATE = 'navigate', 
    LOAD_HOME_PAGE = 'load-home-page',
    LOAD_HOME_PAGE_SUCCESS = 'load-home-page-success',
    LOAD_HOME_PAGE_FAILURE = 'load-home-page-failure', 
    LOAD_FAQ_LIST = 'load-faq-list', 
    LOAD_FAQ_LIST_SUCCESS = 'load-faq-list-success',
    LOAD_FAQ_LIST_FAILURE = 'load-faq-list-failure', 
    SELECT_FAQ_LIST_ITEM = 'select-faq-list-item',
    LOAD_FAQ_DETAIL = 'load-faq-detail', 
    LOAD_FAQ_DETAIL_SUCCESS = 'load-faq-detail-success',
    LOAD_FAQ_DETAIL_FAILURE = 'load-faq-detail-failure',
}

class ActionBase<Type> {
    constructor(public type: Type) {
    }
}

export class ActionNavigate extends ActionBase<ActionType.NAVIGATE> {
    
    constructor(public page: NavigationPage) {
        super(ActionType.NAVIGATE);
    }
}

export class ActionLoadHomePage extends ActionBase<ActionType.LOAD_HOME_PAGE> {
    constructor() {
        super(ActionType.LOAD_HOME_PAGE);
    }
}

export class ActionLoadHomePageSuccess extends ActionBase<ActionType.LOAD_HOME_PAGE_SUCCESS> {
    constructor(public homePage: HomePage) {
        super(ActionType.LOAD_HOME_PAGE_SUCCESS);
    }
}

export class ActionLoadHomePageFailure extends ActionBase<ActionType.LOAD_HOME_PAGE_FAILURE> {
    constructor(public reason: any) {
        super(ActionType.LOAD_HOME_PAGE_FAILURE);
    }
}

export class ActionLoadFAQList extends ActionBase<ActionType.LOAD_FAQ_LIST> {
    constructor() {
        super(ActionType.LOAD_FAQ_LIST);
    }
}

export class ActionLoadFAQListSuccess extends ActionBase<ActionType.LOAD_FAQ_LIST_SUCCESS> {
    constructor(public faqList: FAQSummary[]) {
        super(ActionType.LOAD_FAQ_LIST_SUCCESS);
    }
}

export class ActionLoadFAQListFailure extends ActionBase<ActionType.LOAD_FAQ_LIST_FAILURE> {
    constructor(public reason: any) {
        super(ActionType.LOAD_FAQ_LIST_FAILURE);
    }
}

export class ActionSelectFAQListItem extends ActionBase<ActionType.SELECT_FAQ_LIST_ITEM> {
    constructor(public faqId: any) {
        super(ActionType.SELECT_FAQ_LIST_ITEM);
    }
}

export class ActionLoadFAQDetail extends ActionBase<ActionType.LOAD_FAQ_DETAIL> {
    constructor(public faqId: any) {
        super(ActionType.LOAD_FAQ_DETAIL);
    }
}

export class ActionLoadFAQDetailSuccess extends ActionBase<ActionType.LOAD_FAQ_DETAIL_SUCCESS> {
    constructor(public detail: string) {
        super(ActionType.LOAD_FAQ_DETAIL_SUCCESS);
    }
}

export class ActionLoadFAQDetailFailure extends ActionBase<ActionType.LOAD_FAQ_DETAIL_FAILURE> {
    constructor(public reason: any) {
        super(ActionType.LOAD_FAQ_DETAIL_FAILURE);
    }
}

export type Action 
    = ActionNavigate

    | ActionLoadHomePage
    | ActionLoadHomePageSuccess
    | ActionLoadHomePageFailure

    | ActionLoadFAQList
    | ActionLoadFAQListSuccess
    | ActionLoadFAQListFailure

    | ActionSelectFAQListItem

    | ActionLoadFAQDetail
    | ActionLoadFAQDetailSuccess
    | ActionLoadFAQDetailFailure
    ;

