import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './detail.css';

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
    axios.get('https://api.npoint.io/97d89162575a9d816661').then(response => { //consumo la api y filtro la cuenta por ese id. Esto podria mejorarse usando React-Redux
      const cuentas: Account[] = response.data.cuentas;

      const filteredAccounts = cuentas.filter(el => el.n === id);
      setDetail(filteredAccounts.length > 0 ? filteredAccounts[0] : null);
    });
  }, [id]);

  return (
    <div className="contain">
      <div className='navbar'>
        <p>NCR</p>
      </div>
      <div className='titles'>
        <p>Consulta de Saldo</p>
        <h2>Este es tu saldo actual</h2>
      </div>
      {detail ? (
        <div className='informacion'>
          <p>Saldo de la cuenta: {Number(detail.saldo)}</p>
          <p>
            Tipo de cuenta:
            {detail.tipo_letras === 'CC'
              ? ' Cuenta Corriente'
              : ' Caja de Ahorro'}{' '}
            en {detail.moneda === '$' ? 'Pesos' : 'Dolares'}
          </p>
          <p>Numero de la cuenta: {detail.n}</p>
        </div>
      ) : (
        <p>loading</p>
      )}
      <div className='button'>
        <Link to={`/`}>
          <button className='buttonGreen'>Salir</button>
        </Link>
      </div>
    </div>
  );
};

export default DetailCard;
