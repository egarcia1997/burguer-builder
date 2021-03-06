import React, {Fragment, Component} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (class extends Component {
        state = {
            error: null,
        }

        UNSAFE_componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                console.log(error);
                this.setState({error: error.message});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
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