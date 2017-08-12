import React from 'react';
import ReactScrollableList from 'react-scrollable-list';

const Input = ({ n, averagePrices }) => (
  <div className="input">
    { 
      n < 50 ? 
      <ReactScrollableList
        listItems={ averagePrices.map((price, index) => ({ id: index, content: price })) }
        heightOfItem={ 60 }
        maxItemsToRender={ 50 }
      />
      : <div>Too many items to show! Just check output please</div>
    }
  </div>
)

export default Input;