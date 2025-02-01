import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type CardProps = {
  img: string;
};

const Testimonial: React.FC = () => {
  return (
    <div className="w-full h-full"  style={{ backgroundColor: "#ebf9ff" }}>
      <div className="flex h-max p-12 justify-center">
        <div className="w-2/3">
          <Slider
            autoplay={true}
            autoplaySpeed={3000}
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
          >
            <Card img="https://www.tutorialrepublic.com/examples/images/clients/1.jpg" />
            <Card img="https://www.tutorialrepublic.com/examples/images/clients/2.jpg" />
            <Card img="https://www.tutorialrepublic.com/examples/images/clients/3.jpg" />
          </Slider>
        </div>
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({ img }) => {
  return (
    <div className="flex flex-col items-center text-center text-black">
      <p className="text-2xl font-medium italic mb-4">What our Client says ___</p>

      <div className="w-30 h-30 rounded-full border border-gray-300 p-1 mb-4">
        <img src={img} alt="Client" className="w-full h-full rounded-full" />
      </div>

      <p className="mt-4 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eu sem
        tempor, varius quam at, luctus dui. Mauris magna metus, dapibus nec
        turpis vel, semper malesuada ante. Idac bibendum scelerisque non non
        purus. Suspendisse varius nibh non aliquet.
      </p>

      <p className="italic mt-4 text-green-600">
        <span className="font-medium">PAULA WILSON</span>, Student
      </p>
    </div>
  );
};

export default Testimonial;
