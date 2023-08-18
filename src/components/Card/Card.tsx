import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

interface Props {
  numeroCuenta: string;
  tipoDeCuentas: string;
}

const Card = ({ numeroCuenta, tipoDeCuentas }: Props) => {
  return (
    <div className="containCard">
      <Link to={`/${numeroCuenta}`} className="link">
        <p>{tipoDeCuentas === "CC" ? "Cuenta Corriente" : "Caja de Ahorro"}</p>
        <p>Nro: {numeroCuenta}</p>
      </Link>
    </div>
  );
};

export default Card;
