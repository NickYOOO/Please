import React, { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { onChangeFormfuncType } from '../Post/PostForm';

interface PostDatePickerProps {
  onChangeFormHandler: onChangeFormfuncType;
}

const PostMap = ({ onChangeFormHandler }: PostDatePickerProps) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);
  const [addressOverlay, setAddressOverlay] = useState<kakao.maps.CustomOverlay | null>(null);

  useEffect(() => {
    if (!map) return;

    let previousMarker: kakao.maps.Marker | null = null;
    let previousOverlay: kakao.maps.CustomOverlay | null = null;

    const clickListener = (mouseEvent: any) => {
      const clickedPosition = mouseEvent.latLng;

      if (previousMarker) {
        previousMarker.setMap(null);
      }
      if (previousOverlay) {
        previousOverlay.setMap(null);
      }

      const newMarker = new kakao.maps.Marker({
        position: clickedPosition,
        map,
      });
      setMarker(newMarker);

      function addrFunc(input: string): string {
        const addr = input.replace(/[^\s가-힣]|산/g, '');
        return addr;
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

          let lat: number = clickedPosition.getLat();
          let lng: number = clickedPosition.getLng();

          const addr = addrFunc(fullAddress);

          onChangeFormHandler("position", { lat, lng, addr });

          const overlayPosition = new kakao.maps.LatLng(clickedPosition.getLat() + 0.0001, clickedPosition.getLng());

          const newOverlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            position: overlayPosition,
            map,
          });

          if (addressOverlay) {
            addressOverlay.setMap(null);
          }

          setAddressOverlay(newOverlay);
          previousMarker = newMarker;
          previousOverlay = newOverlay;
        }
      });
    };

    kakao.maps.event.addListener(map, 'click', clickListener);

    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (previousMarker) {
        previousMarker.setMap(null);
      }
      if (previousOverlay) {
        previousOverlay.setMap(null);
      }
      kakao.maps.event.removeListener(map, 'click', clickListener);
    };
  }, [map, marker, addressOverlay, onChangeFormHandler]);

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

        const overlayPosition = new kakao.maps.LatLng(position.getLat() + 0.0001, position.getLng());

        const newOverlay = new kakao.maps.CustomOverlay({
          content: `<div style="position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); background-color: #fff; padding: 5px; font-size: 14px; font-weight:800; border:2px solid">
            주소: ${firstResult.address_name}
          </div>`,
          position: overlayPosition,
          map,
        });

        setAddressOverlay(newOverlay);
      }
    });
  };

  const [searchKeyword, setSearchKeyword] = useState<string>('');

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
          lat: 37.18610826882379,
          lng: 128.45149303027506,
        }}
        style={{
          width: '100%',
          height: '350px',
        }}
        level={3}
        onCreate={setMap}
      />
    </div>
  );
};

export default PostMap;