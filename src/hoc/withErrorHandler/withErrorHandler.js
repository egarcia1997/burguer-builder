import React, {Fragment} from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/httpErrorHandler";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props => {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Fragment>
                <Modal mostrar={error} modalClosed={clearError}>
                    Algo salió mal<br />
                    {error ? error : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    });
}

export default withErrorHandler;