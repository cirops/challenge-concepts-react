import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("/repositories").then((response) => {
      setRepositories(response.data);
    }, []);
  });

  async function handleAddRepository() {
    const newRepo = {
      title: `JS Repo ${Date.now()}`,
      url: "https://github.com/cirops",
      techs: ["Node", "JS", "NodeJS"],
    };
    api.post("/repositories", newRepo).then((response) => {
      setRepositories([...repositories, response.data])
    });
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(() => {
      setRepositories(repositories.filter(repo => repo.id !== id));
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
