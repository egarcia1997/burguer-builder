import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";

class BurguerBuilder extends Component {
    render() {
        return (
            <Fragment>
                <Burger />
                <div>Controles de construcción</div>
            </Fragment>
        );
    }
}

export default BurguerBuilder;