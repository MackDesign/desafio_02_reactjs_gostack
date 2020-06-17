import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(repositories => {
      //console.log(repositories.data);
      setRepositories(repositories.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', { 
      title: "Desafio React Gostack", 
      url: "https://github.com/MackDesign", 
      techs: ["NodeJS", "ReactJS", "React Native" ]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const filteredRepositories = repositories.filter((repository) => { return repository.id !== id } );
    setRepositories(filteredRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => 
            (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>)
            )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
