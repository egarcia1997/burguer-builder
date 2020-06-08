import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import estilos from "./ContactData.module.css";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
    }

    render() {
        return (
            <div className={estilos.ContactData}>
                <h4>Ingresá tu información de contacto</h4>
                <form>
                    <input className={estilos.Input} type="text" name="name" placeholder="Nombre" />
                    <input className={estilos.Input} type="text" name="email" placeholder="Correo electrónico" />
                    <input className={estilos.Input} type="text" name="street" placeholder="Calle" />
                    <input className={estilos.Input} type="text" name="postalCode" placeholder="Código postal" />
                    <Button tipo="Success">COMPRAR</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;