import React from "react";
import estilos from "./Spinner.module.css";

// spinner (el cosito que muestra que esta cargando)
// creditos a luke haas en https://projects.lukehaas.me/css-loaders/
const Spinner = () => {
    return (
        <div className={estilos.Loader}>Cargando...</div>
    );
}

export default Spinner;