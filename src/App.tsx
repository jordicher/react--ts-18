import { useEffect, useState } from 'react';

interface IResPokemon {
  name: string;
}
function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState<IResPokemon | null>(null);

  console.log('renders count'); //2

  useEffect(() => {
    setLoading(true);
    setError(null);

    //fetch pokeapi
    fetch('https://pokeapi.co/api/v2/pokemon/1')
      .then(res => res.json())
      .then(res => {
        setResponse(res);
        setLoading(false);
      })
      .catch(err => {
        setResponse(null);
        setError(err);
        setLoading(false);
      });
  }, []);
  return <div>{response?.name}</div>;
}

export default App;
