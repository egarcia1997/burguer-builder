import axios from "axios";

const instancia = axios.create({
    baseURL: "https://practica-burger-builder.firebaseio.com/",
});

export default instancia;