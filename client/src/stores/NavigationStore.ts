import { Dispatcher } from "flux";
import { ReduceStore } from "flux/utils";
import { Action, ActionType } from "../Action";
import { NavigationPage, fromPath } from "../records/NavigationPage";

interface State {
    page: NavigationPage
}

export class NavigationStore extends ReduceStore<State, Action> {
    constructor(dispatcher: Dispatcher<Action>) {
        super(dispatcher);
    }

    getInitialState(): State {
        let page = fromPath(window.location.pathname);
        return {
            page: page
        };
    }

    reduce(state: State, action: Action): State {
        let result: State;
        switch( action.type ) {
            case ActionType.NAVIGATE:
                result = {
                    page: action.page
                }
                break;
            default:
                result = state;
        }
        return result;
    }
}