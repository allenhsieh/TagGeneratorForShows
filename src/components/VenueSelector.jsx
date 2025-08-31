import { venues } from '../data/venues.js'

const VenueSelector = ({ onVenueSelect }) => {
  return (
    <div className="venue-selector">
      <b>Venue: </b>
      <button onClick={() => onVenueSelect(venues.houston)}>
        Houston
      </button>
      <button onClick={() => onVenueSelect(venues.tripSix)}>
        Trip Six
      </button>
      <button onClick={() => onVenueSelect(venues.theEnd)}>
        The End
      </button>
      <button onClick={() => onVenueSelect(venues.eighteen)}>
        1810 Ojeman
      </button>
      <button onClick={() => onVenueSelect(venues.whiteSwanLive)}>
        White Swan Live
      </button>
      <button onClick={() => onVenueSelect(venues.austin)}>
        Austin, TX
      </button>
      <button onClick={() => onVenueSelect(venues.mohawk)}>
        Mohawk Austin
      </button>
    </div>
  )
}

export default VenueSelector