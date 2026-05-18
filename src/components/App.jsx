import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  // State for all toys
  const [toys, setToys] = useState([]);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // Fetch all toys on page load
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then(res => res.json())
      .then(data => setToys(data))
  }, [])

  // Add new toy to state
  const addToy = (newToy) => {
    setToys(prev => [...prev, newToy])
  }

  // Delete toy from state
  const deleteToy = (id) => {
    setToys(prev => prev.filter(toy => toy.id !== id))
  }

  // Update likes in state
  const updateLikes = (updatedToy) => {
    setToys(prev =>
      prev.map(toy => toy.id === updatedToy.id ? updatedToy : toy)
    )
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        toys={toys}
        deleteToy={deleteToy}
        updateLikes={updateLikes}
      />
    </>
  );
}

export default App;