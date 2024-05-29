
import Carousel from "../../components/Carousel/styles/Carousel"
import { CarouselImg } from "../../data/carouselImages";
import Sponsered from "../../components/Sponser/Sponsered";
import HeroSection from "../../components/Hero/HeroSection";


export default function Home() {
  return (
    <div>

     {/* <Carousel images={CarouselImg} />
     <Sponsered /> */}
      <HeroSection />
      <Sponsered />

    </div>
  )
}
