import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import estilos from "./Auth.module.css";

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
    };

    inputChangedHandler = (event, inputIdentifier) => {
        // todo este quilombo es porque al copiar con ...
        // se guardan las referecias de los atributos de cada atributo
        // no se copia el valor
        const updatedControls = {
            ...this.state.controls,
        };
        const updatedFormElement = {
            ...updatedControls[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedControls[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid,
        });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
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
            <form onSubmit={this.comprarHandler}>
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
            </form>
        );
        return (
            <div className={estilos.Auth}>
                <form>
                    {form}
                    <Button clicked={this.comprarHandler} tipo="Success" disabled={!this.state.formIsValid}>
                        INICIAR SESIÓN
                    </Button>
                </form>
            </div>
        );
    }
}

export default Auth;