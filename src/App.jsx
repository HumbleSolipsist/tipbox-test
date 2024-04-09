import { useEffect, useState } from 'react';

import './App.css';

import Gallery from './Gallery.jsx';

function shuffle(arr) {
  // base-case - a list of length 1 cannot be shuffled.
  if (arr.length <= 1) {
    return arr;
  }

  // select a random index
  let i = Math.floor(Math.random() * arr.length);

  // recursively put the selected item at the beginning of the array
  return [arr[i]].concat(shuffle(arr.toSpliced(i, 1)));
}

function App() {
  const [photosJson, setPhotosJson] = useState([]);

  useEffect(() => {
    const waitForJson = async () => {
      fetch('http://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => {
          setPhotosJson(json)
      })
    }

    waitForJson();
  }, []);

  return (
    <div className="App">
      <Gallery json={photosJson}/>
      <button onClick={() => {
        let s = shuffle(photosJson);
        setPhotosJson(s);
      }}>
        Shuffle
      </button>
    </div>
  );
}

export default App;
