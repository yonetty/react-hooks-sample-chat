import {useState} from 'react';
import Operation from './Operation';
//import Chat from './Chat';
import Chat2 from './Chat2';

const App = () => {
  const [entered, setEntered] = useState(false);
  const [name, setName] = useState('');

  const handleEnter = (name) => {
    setEntered(true);
    setName(name);
  }

  const handleLeave = () => {
    setEntered(false);
  }

  return (
    <div>
      <Operation onEnter={handleEnter} onLeave={handleLeave} entered={entered} />
      { entered && <Chat2 name={name} />}
    </div>
  );
}

export default App;
