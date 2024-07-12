import React from "react";
import classNames from "classnames";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import skeletonStyles from "./styles/Carousel.module.scss";

const CarouselSkeleton = ({ customStyles = {} }) => (
  <SkeletonTheme baseColor="#525252" highlightColor="#313131">
    <div className={classNames(skeletonStyles.carousel_skeleton, customStyles.carousel_skeleton)}>
    <div className={classNames(skeletonStyles.inner_skeleton, customStyles.inner_skeleton)}>
    <div className={classNames(skeletonStyles.carousel_outer, customStyles.carousel_outer)}>
      <Skeleton className={classNames(skeletonStyles.carousel, customStyles.carousel)} />
    </div>
    </div>
    </div>
   
  </SkeletonTheme>
);

export default CarouselSkeleton;
