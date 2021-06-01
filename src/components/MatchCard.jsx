import React from "react";
import { withRouter } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap,faMapMarkerAlt,faNotesMedical } from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
import colors from "assets/css/colors.scss";

const { theme } = colors;

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoidGFiYmVuZSIsImEiOiJjazdkaDhreW4wOXJoM2xud2ZtdmdheGF5In0.Ipm8n0Ak75F4yzx51OPCHQ'
});
const zoom = [8];


function MatchCard(props) {

  const { item, key, style, /* history */ } = props;
  const {
    name,
    host_name = "",
    neighbourhood_group = "",
    neighbourhood = "",
    room_type = "",
    latitude ="",
    longitude ="",
    price = 0
  } = item;
 /* const onClick = () => {
    history.push("/item-detail", { item });
  };*/
  if (
    !name &&
    !host_name &&
    !neighbourhood_group &&
    !neighbourhood &&
    !latitude &&
    !longitude &&
    !room_type
  ) {
    return (
      <div
        className="MatchCard"
        key={key}
        style={{
          ...style,
          borderTopColor: theme,
          display: "block",
          height: 230,
        }}
      >
        <SkeletonTheme color="rgba(227, 247, 250, 0.8)" highlightColor={theme}>
          <p style={{ margin: "20px 10px 0" }}>
            <Skeleton count={4} />
          </p>
        </SkeletonTheme>
      </div>
    );
  }
  return (
    <div key={key} style={style}>
  <div className="media">
  <div className="d-flex mr-3 media-left">
  <Map
  style="mapbox://styles/mapbox/basic-v9"
  zoom={zoom}
  center = {[longitude, latitude]}
  containerStyle={{
    height: '200px',
    width: '100%'
  }}
>
<Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[longitude, latitude]} />
        </Layer>
</Map>
</div>
  <div className="media-body">
    <span className="nomlocal"><FontAwesomeIcon icon={faNotesMedical} /> {room_type}</span>
    <h3 className="mt-0" style={{color:"#00467F"}}>{name}</h3>
                <p className="item_infos">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur consectetur adipisicing elit. Amet numquam aspernatur!</p>
                <p className="card-text"><FontAwesomeIcon icon={faMapMarkerAlt} /> {host_name}<br/><FontAwesomeIcon icon={faMap} /> {`${neighbourhood}, ${neighbourhood_group}`}</p>
  </div>
  <div className="d-flex ml-3 media-right center">
  <p className="price">{price} <sup>DT</sup></p>
  </div>
</div>
 
  </div>
  );
}

const MatchCardWithRouter = withRouter(props => <MatchCard {...props} />);
export default MatchCardWithRouter;
