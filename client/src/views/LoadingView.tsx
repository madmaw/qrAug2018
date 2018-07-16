import * as React from "react";
import * as ReactDOM from "react-dom";
import { Loaded, LoadedState } from "../records/Loaded";

export interface LoadingViewProps<T, SuccessViewProps> {
    loaded: Loaded<T>;
    successView: string | React.StatelessComponent<SuccessViewProps> | React.ComponentClass<SuccessViewProps>,
    successViewPropsFactory: (success: T) => SuccessViewProps,
    onRequestLoad?: () => void;
}

export class LoadingView<T, SuccessViewProps> extends React.Component<LoadingViewProps<T, SuccessViewProps>> {

    render(): React.ReactElement<any> {
        let props = this.props;
        if( props.loaded ) {
            switch(props.loaded.state) {
                default:
                case LoadedState.NOT_REQUESTED:
                    return (
                        <div className="d-flex justify-content-center">
                            <h1>Establishing Connection</h1>
                        </div>
                    )
                case LoadedState.WAITING:
                    return (
                        <div>
                            <div className="col-12 d-flex justify-content-center">
                                <h1>Loading</h1>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <i className="fas fa-spinner fa-spin fa-5x"></i>
                            </div>
                        </div>
                    );
                case LoadedState.FAILURE:
                    return (
                        <div>
                            <div className="col-12 d-flex justify-content-center">
                                <h1>Error</h1>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <div className="col-12 d-flex justify-content-center text-danger">
                                {props.loaded.reason}
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <button type="button" className="btn btn-primary" onClick={props.onRequestLoad}>Retry</button>
                            </div>                    
                        </div>
                    );
                case LoadedState.SUCCESS:
                    let successViewProps = props.successViewPropsFactory(props.loaded.value);
                    return React.createElement(props.successView, successViewProps);
            }
    
        } else {
            return (<div/>);
        }
    }

    

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        let props = this.props;
        // kick off any loading stuff we need to do
        if( props.onRequestLoad != null && props.loaded != null && props.loaded.state == LoadedState.NOT_REQUESTED ) {
            props.onRequestLoad();
        }
    }
}
