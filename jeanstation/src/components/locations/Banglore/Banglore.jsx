import React from 'react'

const Banglore = () => {
  return (
    <div className="container">
      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>

      {/* Clickable Buttons */}
      <div className="buttons">
        <button onClick={() => console.log('Women')}>Women</button>
        <button onClick={() => console.log('Men')}>Men</button>
        <button onClick={() => console.log('Children')}>Children</button>
      </div>

      {/* Advertisement Box */}
      <div className="advertisement">
        Advertisement Banner
      </div>

      {/* Products Section */}
      <div className="products">
        <div className="product">Product 1</div>
        <div className="product">Product 2</div>
        <div className="product">Product 3</div>
      </div>
    </div>
  )
}

export default Banglore