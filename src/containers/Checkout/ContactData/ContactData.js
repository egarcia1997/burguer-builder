import React, { Component } from "react";
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import estilos from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {purchaseBurger} from "../../../store/actions/index";

class ContactData extends Component {
    state = {
        orderForm: {
            nombre: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Nombre",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            calle: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Calle",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            codigoPostal: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Código postal",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 5,
                },
                valid: false,
                touched: false,
            },
            pais: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "País",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Correo electrónico",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            envio: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "pedidosya", displayValue: "Pedidos Ya"},
                        {value: "correoargentino", displayValue: "Correo Argentino"},
                    ]
                },
                value: "pedidosya",
                validation: {
                    required: true,
                },
                valid: true,
                touched: false,
            },
        },
        cargando: false,
        formIsValid: false,
    }

    comprarHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const compra = {
            ingredientes: this.props.ingredients,
            precio: this.props.totalPrice, // en una app real, el precio se calcula en el servidor, no aca
            orderData: formData,
        }
        this.props.onOrderBurger(compra);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // todo este quilombo es porque al copiar con ...
        // se guardan las referecias de los atributos de cada atributo
        // no se copia el valor
        console.log(event.target.value, inputIdentifier);
        const updatedOrderForm = {
            ...this.state.orderForm,
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
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
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
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
                <Button clicked={this.comprarHandler} tipo="Success" disabled={!this.state.formIsValid}>COMPRAR</Button>
            </form>
        );

        return (
            <div className={estilos.ContactData}>
                <h4>Ingresá tu información de contacto</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        cargando: state.cargando,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => {dispatch(purchaseBurger(orderData))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));