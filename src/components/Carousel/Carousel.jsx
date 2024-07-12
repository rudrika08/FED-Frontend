import React, { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Blurhash } from "react-blurhash";
import styles from "./styles/Carousel.module.scss";
import CarouselSkeleton from "../../layouts/Skeleton/Carousel/Carousel";

function Carousel({ children, images, customStyles = {} }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    let timeOut = null;
    if (autoPlay && !isLoading) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 2500);
    }
    return () => clearTimeout(timeOut);
  }, [current, autoPlay, isLoading]);

  const slideRight = () => {
    setCurrent((prevCurrent) => {
      const contentCount = images ? images.length : Children.count(children);
      return prevCurrent === contentCount - 1 ? 0 : prevCurrent + 1;
    });
  };

  const contentCount = images ? images.length : Children.count(children);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (isLoading) {
    return <CarouselSkeleton customStyles={customStyles} />;
  }

  return (
    <div className={classNames(styles.carousel_outer, customStyles.carousel_outer)}>
      <div
        className={classNames(styles.carousel, customStyles.carousel)}
        onMouseEnter={() => {
          setAutoPlay(false);
          clearTimeout(timeOut);
        }}
        onMouseLeave={() => {
          setAutoPlay(true);
        }}
      >
        <div className={classNames(styles.carousel_wrapper, customStyles.carousel_wrapper)}>
          {images
            ? images.map((image, index) => (
                <div
                  key={index}
                  className={classNames(styles.carousel_card, {
                    [styles.carousel_card_active]: index === current,
                    [customStyles.carousel_card]: true,
                    [customStyles.carousel_card_active]: index === current,
                  })}
                >
                  <div className={styles.image_container}>
                    {!isImageLoaded && (
                      <Blurhash
                        hash="LEG8_%els7NgM{M{RiNI*0IVog%L"
                        width="100%"
                        height="100%"
                        resolutionX={32}
                        resolutionY={32}
                        punch={1}
                        className={styles.blurhash}
                      />
                    )}
                    <img
                      className={classNames(styles.card_image, customStyles.card_image, {
                        [styles.loaded]: isImageLoaded,
                      })}
                      src={image.image}
                      alt={image.title}
                      onLoad={handleImageLoad}
                    />
                  </div>
                  <div className={classNames(styles.card_overlay, customStyles.card_overlay)}>
                    <h2 className={classNames(styles.card_title, customStyles.card_title)}>{image.title}</h2>
                  </div>
                </div>
              ))
            : Children.map(children, (child, index) => (
                <div
                  key={index}
                  className={classNames(styles.carousel_card, {
                    [styles.carousel_card_active]: index === current,
                    [customStyles.carousel_card]: true,
                    [customStyles.carousel_card_active]: index === current,
                  })}
                >
                  {child}
                </div>
              ))}
          <div className={classNames(styles.carousel_pagination, customStyles.carousel_pagination)}>
            {Array.from({ length: contentCount }).map((_, index) => (
              <div
                key={index}
                className={classNames(styles.pagination_dot, {
                  [styles.pagination_dot_active]: index === current,
                  [customStyles.pagination_dot]: true,
                  [customStyles.pagination_dot_active]: index === current,
                })}
                onClick={() => setCurrent(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Carousel.propTypes = {
  children: PropTypes.node,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  customStyles: PropTypes.object,
};

export default Carousel;
