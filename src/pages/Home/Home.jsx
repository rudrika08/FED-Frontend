
import Carousel from "../../components/Carousel/styles/Carousel"
import { CarouselImg } from "../../data/carouselImages";
import Sponsered from "../../components/Sponser/Sponsered";


import Hero from "../../components/Hero/Hero"


export default function Home() {
  return (
    <div>

     {/* <Carousel images={CarouselImg} />
     <Sponsered /> */}
      <Hero />
      <Sponsered />

    </div>
  )
}
