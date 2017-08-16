import React from 'react';
import ReactScrollableList from 'react-scrollable-list';

const Output = ({ n, k, averagePrices, handleConstraints }) => {
  let output = [];
  for (let i = 0; i <= n - k; i++) {
    let difference = 0;
    let incrementCount = 0;
    let decrementCount = 0;
    for (let j = i; j < k + i - 1; j++) {
      let currentVal = parseInt(averagePrices[j], 10);
      let nextVal = parseInt(averagePrices[j + 1], 10);

      if (currentVal >= 1000000 || currentVal < 0) {
        handleConstraints("All sale prices must be positive integers less than 1,000,000");
      }

      if (currentVal < nextVal) {
        difference++;
        incrementCount++;
        decrementCount = 0;
        if (incrementCount >= 2) {
          difference++;
          if (incrementCount > 2) {
            difference++;
          }
        }
      }
      if (currentVal > nextVal) {
        difference--;
        decrementCount++;
        incrementCount = 0;
        if (decrementCount >= 2) {
          difference--;
          if (decrementCount > 2) {
            difference--;
          }
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