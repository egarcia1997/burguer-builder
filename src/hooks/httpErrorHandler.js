import { useState, useEffect } from "react";

export default httpClient => {
    const [error, setError] = useState(null);

    // esto que estaba en componentWillMount
    // se deja asi, fuera de cualquier funcion o hook
    // porque se ejecuta ANTES de renderizar el jsx (lo del return)
    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });
    const resInterceptor = httpClient.interceptors.response.use(response => response, error => {
        // este error hace referencia al argumento, no al estado
        console.log(error);
        setError(error.message);
    });

    // para hacer algo igual a componentWillUnmount
    // tengo que usar useEffect y pasarle una funcion que devuelve otra funcion
    // y pasarle un array vacio como dependencia
    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmadoHandler = () => { // esto se ejecuta al hacer clic en el backdrop
        setError(null);
    }

    return [error, errorConfirmadoHandler];
}