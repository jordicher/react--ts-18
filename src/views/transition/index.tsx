import { startTransition, useEffect, useState } from 'react';

interface IResPokemon {
  name: string;
}
function Transition() {
  //hay dos tipos de transiciones de alta prioridad y baja prioridad
  //la prioridad al renderizado, la ajusta por importancia. Por ejemplo, el input quieres que sea de la prioridad inmediata
  //con las transiciones decimos que esa actualización del estado no es tan importante

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState<IResPokemon | null>(null);
  const [query, setQuery] = useState('pikachu');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //prioridad alta
    setInput(e.target.value);

    //prioridad baja
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then(res => res.json())
      .then(res => {
        startTransition(() => {
          //para cosas de ui, para cambios de estado que no tienen tanta prioridad, mostrar alguna notificación en algún sitio. No son prioritarias para la experiencia de usuario
          //para mejorar la experiencia del usuario. No tener la sensación de notar un delay
          //en este caso, al estar dentro de un useEffect, fetch... parece ser que ya detecta que es de baja importancia.
          setResponse(res);
          setLoading(false);
        });
      })
      .catch(err => {
        setResponse(null);
        setError(err);
        setLoading(false);
      });
  }, [query]);

  console.log(response);
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={'Ingrese su nombre'}
      />

      <p>{response?.name}</p>
    </div>
  );
}

export default Transition;
