import React, { useState } from "react";
import { Form, Col, Row, Button, InputGroup, Container } from "react-bootstrap";
import "./App.css"; // Optional: for custom styles
import "bootstrap/dist/css/bootstrap.min.css";

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

  const removeItem = (item, list, setList) => {
    setList(list.filter((i) => i !== item));
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="container">
        <div className="column" id="current-items">
          <h2>Current Tasks</h2>
          <ul className="item-list">
            <Container fluid>
              <Row>
                {currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col lg>
                      <li
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
                    </Col>
                    <Col sm>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item, currentItems, setCurrentItems);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </Container>
          </ul>
        </div>

        <div className="column" id="completed-items">
          <h2>Completed Tasks</h2>
          <ul className="item-list">
            <Container fluid>
              <Row>
                {completedItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col lg>
                      <li
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
                    </Col>
                    <Col sm>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item, completedItems, setCompletedItems);
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </Container>
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
