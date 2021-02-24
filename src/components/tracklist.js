import './tracklist.css';

export const TrackList = ({trackList}) => {

  const tracks = trackList.map((t,i) => {
    console.log(t)
    return (
      <div key={i}>
        <div>{t.track_number}</div>
        <div>{t.track.name}</div>
        {/* <div>{t.track}</div> */}
      </div>
    )
  })

  return (
    <div>{tracks}</div>
  )
}