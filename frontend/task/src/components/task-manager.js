import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskApp() {
  const [currentItems, setCurrentItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/todos")
      .then((res) => {
        const allItems = res.data;
        const current = allItems.filter((item) => !item.completed);
        const completed = allItems.filter((item) => item.completed);
        setCurrentItems(current);
        setCompletedItems(completed);
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  }, []);

  const toggleEditSave = (item) => {
    if (editItemId === item.id) {
      // Save the edited item
      const updatedItem = { ...item, task: editItemName };

      axios
        .put(`http://127.0.0.1:8000/todos/${item.id}`, updatedItem)
        .then((res) => {
          setCurrentItems(
            currentItems.map((i) => (i.id === item.id ? res.data : i))
          );
          setEditItemId(null);
          setEditItemName("");
        })
        .catch((err) => {
          setErrors([err.message]);
        });
    } else {
      // Edit the item
      setEditItemId(item.id);
      setEditItemName(item.task);
    }
  };

  const addItem = () => {
    const newItemObj = { task: newItem };

    axios
      .post("http://127.0.0.1:8000/todos", newItemObj)
      .then((res) => {
        setCurrentItems([...currentItems, res.data]);
        setNewItem("");
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setErrors(["Bad request. Please check the item details."]);
        } else {
          setErrors([err.message]);
        }
      });
  };

  const removeItem = (id, items, setItems) => {
    axios
      .delete(`http://127.0.0.1:8000/todos/${id}`)
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  };

  const moveItem = (item, fromItems, setFromItems, setToItems) => {
    const updatedItem = { ...item, completed: !item.completed };

    axios
      .put(`http://127.0.0.1:8000/todos/${item.id}`, updatedItem)
      .then((res) => {
        setFromItems(fromItems.filter((i) => i.id !== item.id));
        setToItems((prevItems) => [...prevItems, res.data]);
      })
      .catch((err) => {
        setErrors([err.message]);
      });
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="container">
        <div className="column" id="current-items">
          <h2>Current Tasks</h2>
          <ul className="item-list">
            <Container fluid>
              <Row className="mb-3">
                {currentItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col>
                      <div className="item-unit">
                        {editItemId === item.id ? (
                          <>
                            <input
                              type="text"
                              value={editItemName}
                              onChange={(e) => setEditItemName(e.target.value)}
                            />
                            <button onClick={() => toggleEditSave(item)}>
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <li
                              onClick={() =>
                                moveItem(
                                  item,
                                  currentItems,
                                  setCurrentItems,
                                  setCompletedItems
                                )
                              }
                            >
                              {item.task}
                            </li>
                            <Button onClick={() => toggleEditSave(item)}>
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() =>
                                removeItem(
                                  item.id,
                                  currentItems,
                                  setCurrentItems
                                )
                              }
                            >
                              Remove
                            </Button>
                          </>
                        )}
                      </div>
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
              <Row className="mb-3">
                {completedItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col>
                      <div className="item-unit">
                        <li
                          onClick={() =>
                            moveItem(
                              item,
                              completedItems,
                              setCompletedItems,
                              setCurrentItems
                            )
                          }
                        >
                          {item.task}
                        </li>
                        <Button
                          variant="danger"
                          onClick={() =>
                            removeItem(
                              item.id,
                              completedItems,
                              setCompletedItems
                            )
                          }
                        >
                          Remove
                        </Button>
                      </div>
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
}
export default TaskApp;