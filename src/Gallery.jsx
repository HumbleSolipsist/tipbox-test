import './Gallery.css'

import Frame from './Frame.jsx'

function Gallery({json}) {
  return (
    <div className="Gallery">
      {json.map(({title, url, thumbnailUrl}, i) =>
        <Frame key={i} title={title} url={url} thumbnailUrl = {thumbnailUrl}/>)}
    </div>
  )
}

export default Gallery;
