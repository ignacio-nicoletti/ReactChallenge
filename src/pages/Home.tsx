import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import "./home.css";
import FetchData from "../Fetch/FetchData";

interface DataObject {
  cuentas: Cuenta[];
}

interface Cuenta {
  moneda: string;
  n: string;
  tipo_letras: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<DataObject | null>(null); // guardo la data completa
  const [dataSplice, setDataSplice] = useState<Cuenta[]>([]); //guardo la data cortada cada 5
  const [pagina, setPagina] = useState(0);
  const cant = 5;

  useEffect(() => {
 CallApi();
  }, []);

  const CallApi = async () => {
    const data =await FetchData();
    setData(data);
  };
  
  useEffect(() => {
    if (data) {
      const startIndex = pagina * cant;
      const endIndex = startIndex + cant;
      
      setDataSplice(
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
        {dataSplice.length > 0 ? (
          dataSplice.map(
            (
              el: Cuenta,
              index: number // si hay informacion renderizame el componente
            ) => (
              <Card
                key={index}
                numeroCuenta={el.n}
                tipoDeCuentas={el.tipo_letras}
              />
            )
          )
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
