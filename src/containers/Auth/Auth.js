import React, { Fragment, useEffect, useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import estilos from "./Auth.module.css";
import {auth, setAuthRedirectPath} from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elemenType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Correo electrónico",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elemenType: "input",
            elementConfig: {
                type: "password",
                placeholder: "Contraseña",
            },
            value: "",
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        }
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [isSignUp, setIsSignUp] = useState(true);


    const {construyendo, authRedirectPath, onSetAuthRedirectPath} = props;
    useEffect(() => {
        if (!construyendo && authRedirectPath !== "/") {
            onSetAuthRedirectPath("/");
        }
    }, [construyendo, authRedirectPath, onSetAuthRedirectPath]);

    const inputChangedHandler = (event, inputIdentifier) => {
        // todo este quilombo es porque al copiar con ...
        // se guardan las referecias de los atributos de cada atributo
        // no se copia el valor
        const updatedControls = updateObject(authForm, {
            [inputIdentifier]: updateObject(authForm[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[inputIdentifier].validation),
                touched: true,
            }),
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        setAuthForm(updatedControls);
        setFormIsValid(formIsValid);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
    }

    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignUp);
    }

    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key],
        });
    }

    let form = (
        <Fragment>
            {formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    defaultValue={formElement.config.value}
                    touched={formElement.config.touched}
                    invalid={!formElement.config.valid}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button tipo="Success" disabled={!formIsValid}>
                {isSignUp ? "INICIAR SESIÓN" : "REGISTRARSE"}
            </Button>
            <Button tipo="Danger" clicked={switchAuthModeHandler}>
                {isSignUp ? "QUIERO REGISTRARME" : "YA TENGO CUENTA"}
            </Button>
        </Fragment>
    );

    if (props.cargando) {
        form = <Spinner />;
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            // la propiedad message es porque uso el error sacado directamente de firebase
            // con otro backend no sirve
            <p>{props.error.message}</p>
        );
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }

    return (
        <form className={estilos.Auth} onSubmit={submitHandler}>
            {form}
            {errorMessage}
            {authRedirect}
        </form>
    );
}

const mapStateToProps = state => {
    return {
        cargando: state.auth.cargando,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        construyendo: state.burgerBuilder.construyendo,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);