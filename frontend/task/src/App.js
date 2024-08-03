import React, { useState } from "react";
import "./App.css"; // Optional: for custom styles

const App = () => {
  const [currentItems, setCurrentItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setCurrentItems([...currentItems, newItem.trim()]);
      setNewItem("");
    }
  };

  const moveItem = (item, fromList, toList, setFromList, setToList) => {
    setFromList(fromList.filter((i) => i !== item));
    setToList([...toList, item]);
  };

  return (
    <div className="App">
      <h1>Item Tracker</h1>
      <div className="container">
        <div className="column" id="current-items">
          <h2>Current Items</h2>
          <ul className="item-list">
            {currentItems.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  moveItem(
                    item,
                    currentItems,
                    completedItems,
                    setCurrentItems,
                    setCompletedItems
                  )
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="column" id="completed-items">
          <h2>Completed Items</h2>
          <ul className="item-list">
            {completedItems.map((item, index) => (
              <li
                key={index}
                onClick={() =>
                  moveItem(
                    item,
                    completedItems,
                    currentItems,
                    setCompletedItems,
                    setCurrentItems
                  )
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="form-group">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter new item"
        />
        <button onClick={addItem}>Add Item</button>
      </div>
    </div>
  );
};

export default App;
