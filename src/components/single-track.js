import './single-track.css';

export const SingleTrack = ({singleTrack}) => {
  
  if (!singleTrack) return ( <div></div>)
  
  return (
    <div className="track-wrapper">
      <div><img src={singleTrack.track.album.images[1].url} alt="cover" /></div>
      <div>{singleTrack.track.name}</div>
      <div>{singleTrack.track.album.artists[0].name}</div>
    </div>
  )
}