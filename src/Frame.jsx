import './Frame.css'

function Frame({title, url, thumbnailUrl}) {
  return (
    <div className="Frame">
      <h2 className="title"> {title} </h2>
      <img className="photo" src={url}/>
    </div>
  );
}

export default Frame;
