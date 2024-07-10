import { useState, useEffect, Children } from "react";
import PropTypes from "prop-types";
import styles from "./styles/Carousel.module.scss";
import classNames from "classnames";

function Carousel({ children, images, customStyles = {} }) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  let timeOut = null;

  useEffect(() => {
    if (autoPlay) {
      timeOut = setTimeout(() => {
        slideRight();
      }, 2500);
    }
    return () => clearTimeout(timeOut);
  }, [current, autoPlay]);

  const slideRight = () => {
    setCurrent((prevCurrent) => {
      const contentCount = images ? images.length : Children.count(children);
      return prevCurrent === contentCount - 1 ? 0 : prevCurrent + 1;
    });
  };

  const contentCount = images ? images.length : Children.count(children);

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
                  className={
                    index === current
                      ? classNames(styles.carousel_card, styles.carousel_card_active, customStyles.carousel_card, customStyles.carousel_card_active)
                      : classNames(styles.carousel_card, customStyles.carousel_card)
                  }
                >
                  <img className={classNames(styles.card_image, customStyles.card_image)} src={image.image} alt={image.title} />
                  <div className={classNames(styles.card_overlay, customStyles.card_overlay)}>
                    <h2 className={classNames(styles.card_title, customStyles.card_title)}>{image.title}</h2>
                  </div>
                </div>
              ))
            : Children.map(children, (child, index) => (
                <div
                  key={index}
                  className={
                    index === current
                      ? classNames(styles.carousel_card, styles.carousel_card_active, customStyles.carousel_card, customStyles.carousel_card_active)
                      : classNames(styles.carousel_card, customStyles.carousel_card)
                  }
                >
                  {child}
                </div>
              ))}

          <div className={classNames(styles.carousel_pagination, customStyles.carousel_pagination)}>
            {Array.from({ length: contentCount }).map((_, index) => (
              <div
                key={index}
                className={
                  index === current
                    ? classNames(styles.pagination_dot, styles.pagination_dot_active, customStyles.pagination_dot, customStyles.pagination_dot_active)
                    : classNames(styles.pagination_dot, customStyles.pagination_dot)
                }
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
