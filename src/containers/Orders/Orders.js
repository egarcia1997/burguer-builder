import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        cargando: true,
    }

    componentDidMount() {
        axios.get("/compras.json")
            .then(response => {
                console.log(response);
                const fetchedData = [];
                for (let key in response.data) {
                    fetchedData.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                this.setState({orders: fetchedData, cargando: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({cargando: false});
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredientes={order.ingredientes}
                        precio={order.precio}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);