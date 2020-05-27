import React, {Fragment, Component} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (class extends Component {
        state = {
            error: null,
        }

        componentDidMount() {
            axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            axios.interceptors.response.use(response => response, error => {
                console.log(error);
                this.setState({error: error.message});
            });
        }

        errorConfirmadoHandler = () => { // esto se ejecuta al hacer clic en el backdrop
            this.setState({error: null});
        }

        render() {
            return (
                <Fragment>
                    <Modal mostrar={this.state.error} modalClosed={this.errorConfirmadoHandler}>
                        Algo salió mal<br />
                        {this.state.error ? this.state.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    });
}

export default withErrorHandler;