import React, { Component } from "react"

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null,
        }
        
        componentDidMount() {
            // esto es muy dependiente de create-react-app
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                })
        }

        render() {
            let Componente = this.state.component;
            return Componente ? <Componente {...this.props} /> : null;
        }
    }
}

export default asyncComponent;