import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import estilos from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        cargando: false,
        orderForm: {
            nombre: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Nombre",
                },
                value: "",
            },
            calle: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Calle",
                },
                value: "",
            },
            codigoPostal: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Código postal",
                },
                value: "",
            },
            pais: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "País",
                },
                value: "",
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Correo electrónico",
                },
                value: "",
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
            },
        }
    }

    comprarHandler = (event) => {
        event.preventDefault();
        this.setState({cargando: true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const compra = {
            ingredientes: this.props.ingredientes,
            precio: this.props.precio, // en una app real, el precio se calcula en el servidor, no aca
            orderData: formData,
        }
        axios.post("/compras.json", compra)
            .then(response => {
                this.setState({cargando: false});
                console.log(response);
                this.props.history.push("/");
            }).catch(error => {
                this.setState({cargando: false});
                console.log(error);
            });
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
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
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
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button clicked={this.comprarHandler} tipo="Success">COMPRAR</Button>
            </form>
        );
        if (this.state.cargando) {
            form = <Spinner />;
        }
        return (
            <div className={estilos.ContactData}>
                <h4>Ingresá tu información de contacto</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);