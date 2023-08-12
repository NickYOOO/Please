import React, { useEffect, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { Map } from 'react-kakao-maps-sdk';
import { styled } from 'styled-components';
import { onChangeFormfuncType } from '../Post/PostForm';

interface PostDatePickerProps {
  onChangeFormHandler: onChangeFormfuncType;
}

const PostMap = ({ onChangeFormHandler }: PostDatePickerProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [addressOverlay, setAddressOverlay] = useState<kakao.maps.CustomOverlay | null>(null);

  useEffect(() => {
    if (!map) return;

    let currentMarker: kakao.maps.Marker | null = null;
    let currentOverlay: kakao.maps.CustomOverlay | null = null;

    const clickListener = (mouseEvent: any) => {
      const clickedPosition = mouseEvent.latLng;

      if (currentMarker) {
        currentMarker.setMap(null);
      }
      if (currentOverlay) {
        currentOverlay.setMap(null);
      }

      const newMarker = new kakao.maps.Marker({
        position: clickedPosition,
        map,
        zIndex: 1,
      });
      currentMarker = newMarker;

      const ps = new kakao.maps.services.Geocoder();
      ps.coord2Address(clickedPosition.getLng(), clickedPosition.getLat(), (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const fullAddress = result[0].address.address_name;
          const addr = fullAddress.replace(/[^\s가-힣]|산/g, '');

          const overlayPosition = new kakao.maps.LatLng(clickedPosition.getLat() + 0.0001, clickedPosition.getLng());

          const overlayContent = `
            <div style="position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); background-color: #fff; padding: 5px; font-size: 14px; font-weight:800; border:2px solid">
              주소: ${fullAddress}
            </div>
          `;

          const newOverlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            position: overlayPosition,
            map,
          });
          currentOverlay = newOverlay;

          const lat: number = clickedPosition.getLat();
          const lng: number = clickedPosition.getLng();

          onChangeFormHandler('position', { lat, lng, addr });

          if (addressOverlay) {
            addressOverlay.setMap(null);
          }
        }
      });
    };

    kakao.maps.event.removeListener(map, 'click', clickListener);
    kakao.maps.event.addListener(map, 'click', clickListener);

    return () => {
      if (currentMarker) {
        currentMarker.setMap(null);
      }
      if (currentOverlay) {
        currentOverlay.setMap(null);
      }
      if (addressOverlay) {
        addressOverlay.setMap(null);
      }
      kakao.maps.event.removeListener(map, 'click', clickListener);
    };
  }, [map]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearch = () => {
    if (!map || !searchKeyword) return;


    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(searchKeyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK && data.length > 0) {
        const firstResult = data[0];
        const position = new kakao.maps.LatLng(parseFloat(firstResult.y), parseFloat(firstResult.x));
        map.setCenter(position);
      }
    });
  };

  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <MapSearchBox>
      <MapContainer>
        <SearchBox>
          <input type="text" value={searchKeyword} onChange={handleSearchInputChange} onKeyPress={handleOnKeyPress} />
          <button type='button' onClick={handleSearch}>
            <BiSearchAlt size={20} />
          </button>
        </SearchBox>

        <Map
          center={{
            lat: 37.56679717075284,
            lng: 126.97864094748478,
          }}
          style={{
            width: '100%',
            height: '220px',
          }}
          level={3}
          onCreate={setMap}
        />
      </MapContainer>
    </MapSearchBox>
  );
};

export default PostMap;

const MapSearchBox = styled.div`
  width: 100%;
  position: relative;
`;
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const SearchBox = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 2;

  & > button {
    background-color: transparent;
    border: none;

    color: #494949;

    cursor: pointer;
  }

  & > input {
    line-height: 23px;

    padding-left: 10px;

    border: 1px solid #494949;
    border-radius: 20px;

    &:hover {
      border-color: #0074dd !important;
    }
  }
`;
