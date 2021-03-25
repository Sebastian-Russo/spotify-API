import { SingleTrack } from './single-track';
import './tracklist.css';

export const TrackList = ({trackList, handleSingleTrack, singleTrack}) => {

  if (trackList.length === 0) return <div>tracks</div>

  const tracks = trackList.map((t,i) => {
    return (
      <div key={i} className="track" onClick={(e) => handleSingleTrack(e,t)}>
        <div>{i+1}</div>
        <div>{t.track.name}</div>
      </div>
    )
  })

  return (
    <div className="container">
      <SingleTrack singleTrack={singleTrack} />
      <div className="tracklist-wrapper">{tracks}</div>
    </div>
  )
}