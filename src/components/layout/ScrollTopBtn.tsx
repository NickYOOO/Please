import { useEffect, useState } from 'react';
import { StTopBtn } from './Layout.styles';


const ScrollTopBtn = () => {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);
  return (
    <div>
      {showButton && (
        <div id="scrolltop">
          <StTopBtn onClick={scrollToTop} type="button">
            <h1>▲</h1>
          </StTopBtn>
        </div>
      )}
    </div>
  );
};

export default ScrollTopBtn;

;