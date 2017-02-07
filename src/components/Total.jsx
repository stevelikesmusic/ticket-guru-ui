import React from 'react';
import style from './Total.scss';

const Total = ({total}) => {
  let totalPrice = total;
  return (
    <div className={style.total}>
      <h5>Your total order comes out to:</h5>
      <p>${totalPrice}</p>
    </div>
  );
}

export default Total;
