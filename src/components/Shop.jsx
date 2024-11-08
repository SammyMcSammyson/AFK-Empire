'use client';
let Shop = ({ count, setCount }) => {
  
  function buy() {
    if (count >= 10) {
      setCount(count - 10);
      alert('You bought the Flameblade!');
    } else {
      alert('You do not have enough money to purchase this');
    }
  }

  return (
    <div>
      <h1>Shop</h1>
      <p>"Item Name": "Flameblade",</p>
      <p>"Item Cost": 500,</p>
      <buton onClick={buy}>Buy</buton>
      <p>"Damage Per Second": 50,</p>
      <p>"Health": 0,</p>
      <p>
        "Description": "A sword forged in dragon fire, capable of searing
        through enemies with intense heat.",
      </p>
      <p>"Sell Cost": 250</p>
    </div>
  );
};

export default Shop;
