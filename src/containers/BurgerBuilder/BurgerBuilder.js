import React, {Component, Fragment} from "react";
import Burger from "../../components/Burger/Burger";

class BurguerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        ingredientes: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        }
    }

    render() {
        return (
            <Fragment>
                <Burger ingredientes={this.state.ingredientes} />
                <div>Controles de construcción</div>
            </Fragment>
        );
    }
}

export default BurguerBuilder;