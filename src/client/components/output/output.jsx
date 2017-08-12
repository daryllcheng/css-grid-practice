import React from 'react';
import ReactScrollableList from 'react-scrollable-list';

const Output = ({ n, k, averagePrices }) => {
  let output = [];
  for (let i = 0; i <= n - k; i++) {
    let difference = 0;
    let incrementCount = 0;
    let decrementCount = 0;
    for (let j = i; j < k + i - 1; j++) {
      if (averagePrices[j] < averagePrices[j + 1]) {
        difference++;
        incrementCount++;
        decrementCount = 0;
        if (incrementCount >= 2) {
          difference++;
        }
      }
      if (averagePrices[j] > averagePrices[j + 1]) {
        difference--;
        decrementCount++;
        incrementCount = 0;
        if (decrementCount >= 2) {
          difference--;
        }
      }
    }
    output.push(difference); //OR console.log(difference) if you prefer
  }
  return (
    <div className="output">
      <ReactScrollableList
        listItems={ output.map((price, index) => ({ id: index, content: price })) }
        heightOfItem={ 60 }
        maxItemsToRender={ n }
      />
    </div>
  )
}

export default Output;