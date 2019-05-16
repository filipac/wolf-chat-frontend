import React, { Fragment, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map as LeafMap, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { History } from "history";
import gql from "graphql-tag";
import { MainContext } from "../App";
import { Query } from "react-apollo";
import { GET_CHATS } from "../Data";

interface MapContextType {
  history?: History;
  active?: any;
  setActive?: any;
}

export const MapContext = React.createContext<MapContextType>({
  setActive: function(id: any) {
    this.active = id;
    console.log(this);
  }
});

interface MyProps {
  position: LatLngExpression;
  id: number;
}
interface MarkerData {
  position: LatLngExpression;
  key: string;
  id: number;
}

const redIcon = L.icon({
  iconUrl: "/marker-red.png",
  shadowUrl: "/leaf-shadow.png",

  iconSize: [48, 48] // size of the icon
});

const greenIcon = L.icon({
  iconUrl: "/marker-green.png",
  shadowUrl: "/leaf-shadow.png",

  iconSize: [48, 48] // size of the icon
});

const MyPopupMarker = ({ position, id }: MyProps) => {
  let c: MapContextType = useContext(MapContext);
  console.log(c);
  return (
    <MainContext.Consumer>
      {value => {
        console.log("value is", value);
        return (
          <Marker
            position={position}
            icon={value.active && value.active == id ? greenIcon : redIcon}
            id={id}
            onClick={(e: any) => {
              console.log(value);
              c.history!.push(`/chat/${e.target.options.id}`);
            }}
          >
            {/* <Popup>{content}</Popup> */}
          </Marker>
        );
      }}
    </MainContext.Consumer>
  );
};

const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ));
  return <Fragment>{items}</Fragment>;
};

export interface MapProps {
  history: any;
}

export const Map: React.FC<MapProps> = (props: MapProps) => {
  let c: any = useContext(MapContext);
  c.history = props.history;
  const initialMarkers: Array<MarkerData> = [
    {
      key: "marker1",
      position: [46.185183059831004, 21.315251660998914],
      id: 1
    },
    {
      key: "wf",
      position: [46.2307849576877, 21.267476007342342],
      id: 2
    }
  ];

  const [lat, setlat] = useState(46.1732777);
  const [lng, setlng] = useState(21.3345085);
  const [zoom, setzoom] = useState(12);
  const [markers, setmarkers] = useState(initialMarkers);

  const position: LatLngExpression = [lat, lng];

  const handleClick = (e: any) => {
    console.log(e);
  };

  return (
    <LeafMap
      center={position}
      zoom={zoom}
      className="w-full h-screen"
      onClick={handleClick}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
      />
      <Query
        query={GET_CHATS}
        pollInterval={100000}
        fetchPolicy="cache-and-network"
      >
        {(data: any) => {
          if (data.loading) return "Loading...";
          if (data.error) return `Error! ${data.error.message}`;

          console.log(data);

          return <MyMarkersList markers={data.data.activeChats} />;
        }}
      </Query>
    </LeafMap>
  );
};
