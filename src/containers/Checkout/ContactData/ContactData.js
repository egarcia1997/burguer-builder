import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import estilos from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        cargando: false,
    }

    comprarHandler = (event) => {
        event.preventDefault();
        this.setState({cargando: true});
        const compra = {
            ingredientes: this.props.ingredientes,
            precio: this.props.precio, // en una app real, el precio se calcula en el servidor, no aca
            cliente: {
                nombre: "E. García",
                direccion: {
                    calle: "Calle Falsa 123",
                    codigoPostal: "1234",
                    pais: "Peronia",
                },
                email: "alguien@dominio.com",
            },
            envio: "Venezolano de PedidosYa",
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
                <Input type="text" name="name" placeholder="Nombre" />
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