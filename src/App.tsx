import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface IResPokemon {
  name: string;
}
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState<IResPokemon | null>(null);

  console.log('renders count'); //primer render

  useEffect(() => {
    //segundo render
    setLoading(true);
    setError(null);

    fetch('https://pokeapi.co/api/v2/pokemon/1')
      .then(res => res.json())
      .then(res => {
        //tercer render
        setResponse(res);
        setLoading(false);
      })
      .catch(err => {
        setResponse(null);
        setError(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {response?.name}

      <Link to="/transition">Transitions</Link>
    </div>
  );
}

export default App;
