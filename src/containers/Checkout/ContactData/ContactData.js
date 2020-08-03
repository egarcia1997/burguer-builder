import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import estilos from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = props => {
        const [orderForm, setOrderForm] = useState({orderForm: {
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
        }});
         const [formIsValid, setFormIsValid] = useState(false);

    const comprarHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        const compra = {
            ingredientes: props.ingredients,
            precio: props.totalPrice, // en una app real, el precio se calcula en el servidor, no aca
            orderData: formData,
            userId: props.userId,
        }
        props.onOrderBurger(compra, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true,
        });
        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement,
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }
    let form = (
        <form onSubmit={comprarHandler}>
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
            <Button clicked={comprarHandler} tipo="Success" disabled={!formIsValid}>COMPRAR</Button>
        </form>
    );

    return (
        <div className={estilos.ContactData}>
            <h4>Ingresá tu información de contacto</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        cargando: state.order.cargando,
        token: state.auth.token,
        userId: state.auth.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => {dispatch(purchaseBurger(orderData, token))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(withRouter(ContactData), axios));