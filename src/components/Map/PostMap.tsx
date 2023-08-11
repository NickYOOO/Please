import React, { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { onChangeFormfuncType } from '../Post/PostForm';

interface PostDatePickerProps {
  onChangeFormHandler: onChangeFormfuncType
}

const PostMap = ({ onChangeFormHandler }: PostDatePickerProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);
  const [clickInfo, setClickInfo] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [addressOverlay, setAddressOverlay] = useState<kakao.maps.CustomOverlay | null>(null);

  useEffect(() => {
    if (!map) return;

    let previousOverlay: kakao.maps.CustomOverlay | null = null;

    const clickListener = (mouseEvent: any) => {
      const clickedPosition = mouseEvent.latLng;

      if (marker) {
        marker.setPosition(clickedPosition);
      } else {
        const newMarker = new kakao.maps.Marker({
          position: clickedPosition,
          map,
        });
        setMarker(newMarker);
      }
      let lat = clickedPosition.getLat()
      let lng = clickedPosition.getLng()
      const message = `클릭한 위치의 위도는 ${clickedPosition.getLat()} 이고, 경도는 ${clickedPosition.getLng()} 입니다`;

      if (previousOverlay) {
        previousOverlay.setMap(null);
        setAddressOverlay(null);
      }

      const ps = new kakao.maps.services.Geocoder();
      ps.coord2Address(clickedPosition.getLng(), clickedPosition.getLat(), (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const fullAddress = result[0].address.address_name;
          const overlayContent = `
          <div style="position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); background-color: #fff; padding: 5px; font-size: 14px; font-weight:800; border:2px solid">
          주소: ${fullAddress}
        </div>
          `;



          const overlayPosition = new kakao.maps.LatLng(clickedPosition.getLat() + 0.0001, clickedPosition.getLng()); // 마커 위로 조금 올린 위치

          const newOverlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            position: overlayPosition,
            map,
          });

          setAddressOverlay(newOverlay);
          setAddressOverlay(null)
          previousOverlay = newOverlay;
        }
      });
    };

    kakao.maps.event.addListener(map, 'click', clickListener);

    return () => {
      if (marker) {
        marker.setMap(null);
      }
      kakao.maps.event.removeListener(map, 'click', clickListener);
    };
  }, [map, marker, addressOverlay]);

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

        if (marker) {
          marker.setPosition(position);
        } else {
          const newMarker = new kakao.maps.Marker({
            position,
            map,
          });
          setMarker(newMarker);
        }

        if (addressOverlay) {
          addressOverlay.setMap(null);
        }

        map.panTo(position);
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearch}>검색</button>
      <Map
        center={{
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3}
        onCreate={setMap}
      />
      <div id="clickLatlng">{clickInfo}</div>
    </div>
  );
};

export default PostMap;