import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ImageSliderProps = {
    images: string[];
};

export default function ImageSlider({ images }: ImageSliderProps) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings} className="pt-100">
            {images.map((src, index) => (
                <div key={index}>
                    <img
                        src={src}
                        alt={`Slide ${index}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "fill",
                            borderRadius: 10,
                            paddingTop: 20,
                        }}
                    />
                </div>
            ))}
        </Slider>
    );
}
