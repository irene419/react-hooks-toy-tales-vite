import React from "react";

// ToyCard receives toy, deleteToy and updateLikes as props
// Like button makes PATCH request to increase likes
// Donate button makes DELETE request to remove toy

function ToyCard({ toy, deleteToy, updateLikes }) {

  // PATCH request to increase likes
  const handleLike = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: toy.likes + 1 })
    })
      .then(res => res.json())
      .then(updatedToy => updateLikes(updatedToy))
  }

  // DELETE request to remove toy
  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE"
    })
      .then(() => deleteToy(toy.id))
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>Like {"<3"}</button>
      <button className="del-btn" onClick={handleDelete}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;