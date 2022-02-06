import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = (props) =>
  <GoogleMap
    defaultZoom={6}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>

export const WrappedMap = withScriptjs(withGoogleMap(MyMapComponent))
