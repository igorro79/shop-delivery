import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Thumb = styled.div`
  display: inline-block;
  width: 100%;
  height: 200px;
  border: 2px dashed grey;
  border-radius: 5px;
  background-color: lightgrey;
`;
export const Map = function ({ center, zoom }) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, { center, zoom }));
    }
  }, [ref, map, center, zoom]);

  return <Thumb ref={ref} id="map" />;
};
