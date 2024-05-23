import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks, setBanks } from '../../redux/bankSlice';

const BankList = () => {
  const dispatch = useDispatch();
  const { banks, status, error } = useSelector((state) => state.banks);

  useEffect(() => {
    const storedBanks = localStorage.getItem('banks');
    //Validación para establecer el estado de bancos en Redux
    if (storedBanks) {
      dispatch(setBanks(JSON.parse(storedBanks)));
    } else {
      //Si los datos no existen se despacha 'fetchBanks' para realizar la solicitud HTTP y obtener los datos
      //Almacena los datos en localStorage para futuras visitas
      dispatch(fetchBanks()).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          localStorage.setItem('banks', JSON.stringify(response.payload));
        }
      });
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bank-list">
      {banks.map((bank, index) => (
        <div key={index} className="bank-card">
          <img src={bank.url} alt="" />
          <h2>{bank.bankName}</h2>
          <p>{bank.description}</p>
          <p>Tiempo de existencia: <span>{bank.age} años</span></p>
        </div>
      ))}
    </div>
  );
};

export default BankList;
