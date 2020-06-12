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
                value: "",
            },
        }
    }

    comprarHandler = (event) => {
        event.preventDefault();
        this.setState({cargando: true});
        const compra = {
            ingredientes: this.props.ingredientes,
            precio: this.props.precio, // en una app real, el precio se calcula en el servidor, no aca
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

    render() {
        let form = (
            <form>
                <Input elementType="" elementConfig="" value="" />
                <Input type="text" name="email" placeholder="Correo electrónico" />
                <Input type="text" name="street" placeholder="Calle" />
                <Input type="text" name="postalCode" placeholder="Código postal" />
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