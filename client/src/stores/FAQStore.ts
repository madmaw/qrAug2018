import { Loaded, LoadedState } from "../records/Loaded";
import { FAQSummary } from "../records/FAQSummary";
import { ReduceStore } from "flux/utils";
import { Action, ActionLoadHomePage, ActionType, ActionLoadFAQListSuccess, ActionLoadFAQListFailure, ActionLoadFAQDetail, ActionLoadFAQDetailSuccess, ActionLoadFAQDetailFailure } from "../Action";
import { Dispatcher } from "flux";
import { DataService } from "../service/DataService";

interface State {
    faqList: Loaded<FAQSummary[]>, 
    selectedFAQId?: any, 
    selectedFAQDetail?: Loaded<string>,
}

export class FAQStore extends ReduceStore<State, Action> {

    constructor(dispatcher: Dispatcher<Action>, private dataService: DataService) {
        super(dispatcher);
    }

    getInitialState(): State {
        return {
            faqList: {
                state: LoadedState.NOT_REQUESTED
            }
        };
    }
    
    reduce(state: State, action: Action): State {
        let result: State;
        switch( action.type) {
            case ActionType.LOAD_FAQ_LIST:
                if( state.faqList.state != LoadedState.WAITING ) {
                    result = {
                        faqList: {
                            state: LoadedState.WAITING
                        }
                        // intentionally discard selection state
                    };
                }
                this.dataService.requestFAQSummaries().then(
                    (faqs: FAQSummary[]) => {
                        this.getDispatcher().dispatch(
                            new ActionLoadFAQListSuccess(faqs)
                        );
                    }
                ).catch(
                    function(reason: any) {
                        this.getDispatcher().dispatch(
                            new ActionLoadFAQListFailure(reason)
                        );
                    }
                );
                break;
            case ActionType.LOAD_FAQ_LIST_SUCCESS:
                result = {
                    faqList: {
                        state: LoadedState.SUCCESS, 
                        value: action.faqList
                    }
                    // intentionally discard selection state
                }
                break;
            case ActionType.LOAD_FAQ_LIST_FAILURE:
                result = {
                    faqList: {
                        state: LoadedState.FAILURE, 
                        reason: action.reason
                    }
                    // intentionally discard selection state
                }
                break;
            case ActionType.SELECT_FAQ_LIST_ITEM:
                state = Object.assign(
                    {},
                    state, 
                    {
                        selectedFAQId: action.faqId
                    }
                );
                // immediately request the selected FAQ detail
                // falls through!
            case ActionType.LOAD_FAQ_DETAIL:
                result = Object.assign(
                    {},
                    state, 
                    {
                        selectedFAQDetail: {
                            state: LoadedState.WAITING
                        }
                    }
                );
                this.dataService.requestFAQBody(action.faqId).then(
                    (detail: string) => {
                        this.getDispatcher().dispatch(
                            new ActionLoadFAQDetailSuccess(detail)
                        )
                    }
                ).catch(
                    (reason: any) => {
                        this.getDispatcher().dispatch(
                            new ActionLoadFAQDetailFailure(reason)
                        );
                    } 
                );
                break;
            case ActionType.LOAD_FAQ_DETAIL_SUCCESS:
            
                result = Object.assign(
                    {},
                    state, 
                    { 
                        selectedFAQDetail: {
                            state: LoadedState.SUCCESS,
                            value: action.detail
                        }
                    }
                );
                break;
            case ActionType.LOAD_FAQ_DETAIL_FAILURE:
                result = Object.assign(
                    {},
                    state, 
                    {
                        selectedFAQDetail: {
                            state: LoadedState.FAILURE, 
                            reason: action.reason
                        }
                    }
                );
                break;
            default: 
                result = state;
        }
        return result;
    }
}