import Carousel from "nuka-carousel";
import "./ImgCarousel.css";

function ImgCarousel(props) {
    return (
        <Carousel
            className="carouselContainer"
            renderBottomCenterControls={false}
            
        >
            {props.images.map((img, index) => {
                return (
                    <img
                        className="carouselImg"
                        key={index}
                        src={`../Data/cities/${props.imageName}Img/${img.url}`}
                        alt={`Imagem de ${props.name}`}
                    />
                );
            })}
        </Carousel>
    );
}

export default ImgCarousel;
