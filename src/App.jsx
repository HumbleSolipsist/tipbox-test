import { useEffect, useState } from 'react';

import './App.css';

import Gallery from './Gallery.jsx';

// Returns a randomized ordering of the elements in the given array (arr)
// Note: does *not* modify arr.
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

  // Gets the json from jsonplaceholder
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

  // Used for pagination
  const [curPage, setCurPage] = useState(0);
  const [picsPerPage, setPicsPerPage] = useState(20);
  const curPageStart = curPage * picsPerPage;
  const curPageEnd = curPageStart + picsPerPage;
  const pageCount = Math.ceil(photosJson.length / picsPerPage);

  return (
    <div className="App">
      <Gallery json={photosJson.slice(curPageStart, curPageEnd)}/>

      {/* Pagination */}
      <button onClick={() => setCurPage(curPage - 1)} disabled={curPage == 0}> Prev </button>
      Page {curPage + 1}/{pageCount}
      <button onClick={() => setCurPage(curPage + 1)} disabled={curPage == pageCount - 1}> Next </button>
      <br/>

      {/* Shuffles the gallery */}
      <button onClick={() => {
        setPhotosJson(shuffle(photosJson));
        setCurPage(0);
      }}>
        Shuffle
      </button>
    </div>
  );
}

export default App;
