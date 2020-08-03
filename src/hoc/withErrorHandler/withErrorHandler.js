import React, {Fragment, useState, useEffect} from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    return (props => {
        const [error, setError] = useState(null);

        // esto que estaba en componentWillMount
        // se deja asi, fuera de cualquier funcion o hook
        // porque se ejecuta ANTES de renderizar el jsx (lo del return)
        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });
        const resInterceptor = axios.interceptors.response.use(response => response, error => {
            // este error hace referencia al argumento, no al estado
            console.log(error);
            setError(error.message);
        });

        // para hacer algo igual a componentWillUnmount
        // tengo que usar useEffect y pasarle una funcion que devuelve otra funcion
        // y pasarle un array vacio como dependencia
        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmadoHandler = () => { // esto se ejecuta al hacer clic en el backdrop
            setError(null);
        }

        return (
            <Fragment>
                <Modal mostrar={error} modalClosed={errorConfirmadoHandler}>
                    Algo salió mal<br />
                    {error ? error : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    });
}

export default withErrorHandler;