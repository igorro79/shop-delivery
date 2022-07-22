import React, { memo } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import styled from "styled-components";

const Thumb = styled.div`
  display: inline-block;
  width: 400px;
  height: 400px;
  border: 2px dashed grey;
  border-radius: 5px;
  background-color: lightgrey;
`;
const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  rotateControl: false,
  streetViewControl: false,
  clicableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: false,
  fullscreenControl: false,
};
function Map({ center }) {
  return (
    <Thumb>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={defaultOptions}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </Thumb>
  );
}

export default memo(Map);
