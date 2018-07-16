import { Dispatcher } from "flux";
import { ReduceStore } from "flux/utils";

import { Loaded, LoadedState } from "../records/Loaded";
import { HomePage } from "../records/HomePage";
import { Action, ActionType, ActionLoadHomePageSuccess, ActionLoadHomePageFailure } from "../Action";
import { DataService } from "../service/DataService";

interface State {
    homePage: Loaded<HomePage>;
}

export class HomePageStore extends ReduceStore<State, Action> {
    constructor(dispatcher: Dispatcher<Action>, private dataService: DataService) {
        super(dispatcher);
    }

    getInitialState(): State {
        return {
            homePage: {
                state: LoadedState.NOT_REQUESTED
            }
        };
    }

    reduce(state: State, action: Action): State {
        let result: State;
        switch( action.type) {
            case ActionType.LOAD_HOME_PAGE:
                if( state.homePage.state != LoadedState.WAITING ) {
                    // put it in a loading state
                    result = {
                        homePage: {
                            state: LoadedState.WAITING
                        }
                    };
                    // make a new request
                    this.dataService.requestHomePage().then(
                        (homePage: HomePage) => {
                            this.getDispatcher().dispatch(
                                new ActionLoadHomePageSuccess(homePage)
                            );
                        }
                    ).catch(
                        (reason: any) => {
                            this.getDispatcher().dispatch(
                                new ActionLoadHomePageFailure(reason)
                            );    
                        }
                    );
                } else {
                    result = state;
                }
                break;
            case ActionType.LOAD_HOME_PAGE_SUCCESS:
                result = {
                    homePage: {
                        state: LoadedState.SUCCESS, 
                        value: action.homePage
                    }
                };
                break;
            case ActionType.LOAD_HOME_PAGE_FAILURE:
                result = {
                    homePage: {
                        state: LoadedState.FAILURE, 
                        reason: action.reason
                    }
                };
                break;
            default:
                result = state;
        }
        return result;
    }


}