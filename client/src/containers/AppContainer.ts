import { Dispatcher } from 'flux';
import {Container} from 'flux/utils';
import { AppViewProps, AppView } from '../views/AppView';
import { NavigationStore } from '../stores/NavigationStore';
import { Action, ActionNavigate, ActionLoadHomePage, ActionLoadFAQList, ActionSelectFAQListItem } from '../Action';
import { DataService } from '../service/DataService';
import { NavigationPage } from '../records/NavigationPage';
import { HomePageStore } from '../stores/HomePageStore';
import { FAQStore } from '../stores/FAQStore';


export function createAppContainer(dispatcher: Dispatcher<Action>, dataService: DataService): Container.Component<AppViewProps, any, any> {

    let navigationStore = new NavigationStore(dispatcher);
    let homePageStore = new HomePageStore(dispatcher, dataService);
    let faqStore = new FAQStore(dispatcher, dataService);
    function getStores(): any /*FluxStore<any>[]*/ {
        return [
            navigationStore, 
            homePageStore, 
            faqStore
        ];
    }

    function getState(): AppViewProps {

        function onNavigate(page: NavigationPage) {
            dispatcher.dispatch(new ActionNavigate(page));
        }

        function onRequestLoadHomePage() {
            dispatcher.dispatch(new ActionLoadHomePage());
        }

        function onRequestLoadFAQList() {
            dispatcher.dispatch(new ActionLoadFAQList());
        }

        function onSelectFAQ(faqId: any) {
            dispatcher.dispatch(new ActionSelectFAQListItem(faqId));
        }

        return {
            page: navigationStore.getState().page,

            onNavigate: onNavigate, 
            homePage: homePageStore.getState().homePage, 
            onRequestLoadHomePage: onRequestLoadHomePage,

            faqList: faqStore.getState().faqList, 
            selectedFAQId: faqStore.getState().selectedFAQId,
            onRequestLoadFAQList: onRequestLoadFAQList,

            onSelectFAQ: onSelectFAQ, 
            selectedFAQDetail: faqStore.getState().selectedFAQDetail
        };
    }    
    
    return Container.createFunctional(AppView, getStores, getState);
}