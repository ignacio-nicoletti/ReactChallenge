import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import "./home.css";

interface DataObject {
  cuentas: Cuenta[];
}

interface Cuenta {
  moneda: string;
  n: string;
  tipo_letras: string;
}

const Home: React.FC = () => {
  const apiUrl: any = process.env.REACT_APP_API_URL; //url de la api 

  const [data, setData] = useState<DataObject | null>(null);  // guardo la data completa 
  const [datasplice, setDatasplice] = useState<Cuenta[]>([]); //guardo la data cortada cada 5
  const [pagina, setPagina] = useState(0);
  const cant = 5;

  useEffect(() => {
    axios.get(apiUrl).then((response) => {
      setData(response.data);
    }); //se monta el componente y consume la api guardandola en un estado local 
  }, []);

  useEffect(() => {
    if (data) {
      const startIndex = pagina * cant;
      const endIndex = startIndex + cant;
      setDatasplice(
        data.cuentas
          .filter(
            (el: Cuenta) =>
              (el.moneda === "$" || el.moneda === "u$s") &&
              (el.tipo_letras === "CC" || el.tipo_letras === "CA") // filtro aquellos objetos que tengan pesos,dolares y sea caja de ahorro y cuenta corriente
          )
          .slice(startIndex, endIndex)
      );
    }
  }, [data, pagina]);

  const handlerPlus = () => {
    setPagina(pagina + 1);
  };

  const handlerRest = () => {
    setPagina(pagina - 1);
  };

  return (
    <div className="containHome">
      <div className="navbar">
        <p>NCR</p>
      </div>
      <div className="titles">
        <p>Consulta de Saldo</p>
        <h3>Selecciona la Cuenta a Consultar</h3>
      </div>
      <div className="containCards">
        {pagina > 0 && ( // Verifica si la página es mayor que 0 para mostrar el botón
          <div className="ButtonOpcion" onClick={handlerRest}>
            <p>« Opciones anteriores</p>
          </div>
        )}
        {datasplice.length > 0 ? (
          datasplice.map((el: Cuenta, index: number) => (// si hay informacion renderizame el componente 
            <Card
              key={index}
              numeroCuenta={el.n}
              tipoDeCuentas={el.tipo_letras}
            />
          ))
        ) : (
          <p>Loading...</p> //sino cargando 
        )}
        <div className="ButtonOpcion" onClick={handlerPlus}>
          <p>Mas Opciones »</p>
        </div>
      </div>
      <div className="button">
        <button>Salir</button>
      </div>
    </div>
  );
};

export default Home;
