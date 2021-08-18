import Head from 'next/head'
import { GeoJSONLayer } from "react-mapbox-gl";
import { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

export default function Home(props) {

  const Map = ReactMapboxGl({
    accessToken: props.accessToken,
  });

  const [points, setPoints] = useState({
    "type": "FeatureCollection",
    "features": []
  });

  useEffect(() => {
    axios.get('https://data.cdc.gov/resource/5jp2-pgaw.json').then((res) => {
      let fetchedFeatures = res.data.map((el) => {
        return {
          "type": "Feature",
          "properties": {id: 'circle'},
          "geometry": {
              "type": "Point",
              "coordinates": [el.longitude, el.latitude]
          }
        }
      })
      setPoints({
        "type": "FeatureCollection",
        "features": fetchedFeatures
      })
    })
  }, [])

  return (
    <div>
      <Head>
        <link href="https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css" rel="stylesheet" />
      </Head>
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        zoom={[4]}
        center={[-83.317903, 40.602125]}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}>
          <GeoJSONLayer
            data={points}
            sourceLayer={'circle'}
            circleLayout={{}}
            circlePaint={{
              'circle-radius': 3,
              'circle-color': '#223b53',
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
              'circle-opacity': 0.5
            }}
            />
        </Map>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   return {
//     props: {accessToken: process.env.ACCESS_TOKEN},
//   }
// }