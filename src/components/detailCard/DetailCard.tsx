import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./detail.css";
import FetchData from "../../Fetch/FetchData";

interface Account {
  n: string;
  saldo: number;
  tipo_letras: string;
  moneda: string;
}

const DetailCard: React.FC = () => {
  const [detail, setDetail] = useState<Account | null>(null);

  const { id } = useParams<{ id: string }>(); //obtengo un numero de cuenta corriente como id

  useEffect(() => {
    CallApi();
  }, [id]);

  const CallApi = async () => {
    const data = await FetchData();//tare la data y la filtra por ese Id/numero de cuenta
    const filteredAccounts = data.cuentas.filter((el: any) => el.n === id);
    setDetail(filteredAccounts.length > 0 ? filteredAccounts[0] : null);
  };

  return (
    <div className="contain">
      <div className="navbar">
        <p>NCR</p>
      </div>
      <div className="titles">
        <p>Consulta de Saldo</p>
        <h2>Este es tu saldo actual</h2>
      </div>
      {detail ? (
        <div className="informacion">
          <p>Saldo de la cuenta: {Number(detail.saldo)}</p>
          <p>
            Tipo de cuenta:
            {detail.tipo_letras === "CC"
              ? " Cuenta Corriente"
              : " Caja de Ahorro"}{" "}
            en {detail.moneda === "$" ? "Pesos" : "Dolares"}
          </p>
          <p>Numero de la cuenta: {detail.n}</p>
        </div>
      ) : (
        <p>loading</p>
      )}
      <div className="button">
        <Link to={`/`}>
          <button className="buttonGreen">Salir</button>
        </Link>
      </div>
    </div>
  );
};

export default DetailCard;
