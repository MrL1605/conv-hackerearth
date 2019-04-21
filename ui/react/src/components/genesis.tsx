import {Component} from "react";


interface MenuAppBarState {

}

export class GenesisComponent extends Component<any, MenuAppBarState> {

    constructor(props) {
        super(props);
    }

    render(): React.ReactNode {
        return <div className={"container"}>

            <div className={"col-sm-6 col-sm-offset-3"}>

                Hello

            </div>
        </div>;
    }

}
