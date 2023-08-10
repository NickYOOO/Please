import React from 'react';
import { Circle, Map } from 'react-kakao-maps-sdk';
import * as Styled from './DetailMap.style';

interface DetailMapProps {
  latitude: number;
  longitude: number;
}

const DetailMap: React.FC<DetailMapProps> = ({ latitude, longitude }) => {
  const markerPosition = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <Styled.MapLayout>
      <Map center={markerPosition} style={{ width: '98%', height: '95%' }} level={4} isPanto={true}>
        <Circle center={markerPosition} radius={300} strokeColor={'#0074dd'} strokeOpacity={0.7} fillColor={'#0074dd'} fillOpacity={0.1} />
      </Map>
    </Styled.MapLayout>
  );
};

export default DetailMap;
