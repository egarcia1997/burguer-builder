import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
        if (!this.props.cargando) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredientes={order.ingredientes}
                    precio={order.precio}
                />
            ));
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cargando: state.order.cargando,
        orders: state.order.orders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => {dispatch(fetchOrders())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));