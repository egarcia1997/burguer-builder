import React, { Component, Fragment } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import Spinner from "../../components/UI/Spinner/Spinner";
import estilos from "./Auth.module.css";
import {auth, setAuthRedirectPath} from "../../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
    state = {
        controls: {
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
        },
        cargando: false,
        formIsValid: false,
        isSignup: true,
    };

    componentDidMount = () => {
        if (!this.props.construyendo && this.props.authRedirectPath !== "/") {
            this.props.onSetAuthRedirectPath("/");
        }
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // todo este quilombo es porque al copiar con ...
        // se guardan las referecias de los atributos de cada atributo
        // no se copia el valor
        const updatedControls = updateObject(this.state.controls, {
            [inputIdentifier]: updateObject(this.state.controls[inputIdentifier], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true,
            }),
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid,
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup,};
        });
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button tipo="Success" disabled={!this.state.formIsValid}>
                    {this.state.isSignup ? "INICIAR SESIÓN" : "REGISTRARSE"}
                </Button>
                <Button tipo="Danger" clicked={this.switchAuthModeHandler}>
                    {this.state.isSignup ? "QUIERO REGISTRARME" : "YA TENGO CUENTA"}
                </Button>
            </Fragment>
        );

        if (this.props.cargando) {
            form = <Spinner />;
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                // la propiedad message es porque uso el error sacado directamente de firebase
                // con otro backend no sirve
                <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <form className={estilos.Auth} onSubmit={this.submitHandler}>
                {form}
                {errorMessage}
                {authRedirect}
            </form>
        );
    }
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