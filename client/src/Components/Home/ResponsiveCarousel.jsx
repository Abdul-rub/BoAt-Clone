import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export const ResponsiveCarousal = () => {
  return (
    <Carousel
      className="carousel"
      autoPlay="true"
      infiniteLoop="true"
      interval="2000"
      showThumbs=""
      // width={"94%"}
      // centerMode="true"
      // dynamicHeight="false"
    >
      <div>
        <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/Desktop_3416514a-87f6-4562-bde3-420528f42d9f_1400x.jpg?v=1696856402"
          alt="Sale"
        />
      </div>
      <div>
        <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/Airdopes_200_Plus_Banner_WEB_1_1400x.jpg?v=1696905548"
          alt="AirDopes"
        />
      </div>
      <div>
        <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/Groom_banner_WEB_1_1400x.jpg?v=1698404294"
          alt="Cinema Week"
        />
      </div>
      <div>
        <img
          src="https://www.boat-lifestyle.com/cdn/shop/files/LNT_WEB_1400x.jpg?v=1698230264"
          alt="Wave Style"
        />
      </div>
    </Carousel>
  );
};

export default ResponsiveCarousal;
