import Carousel from "nuka-carousel";
import "./ImgCarousel.css";

function ImgCarousel(props) {
    return (
        <Carousel className="carouselConteiner">
            {/* {console.log(town.images)}
            {town.images.map((img) => {
                return (
                    <li>
                        <img
                            src={`../Data/cities/${town.imageName}Img/${img.url}`}
                            alt={`imagem de ${town.name}`}
                        />
                    </li>
                );
            })} */}

            {props.images.map((img) => {
                return <img src={`../Data/cities/${props.imageName}Img/${img.url}`} alt={`Imagem de ${props.name}`} />;
            })}
        </Carousel>
    );
}

export default ImgCarousel;
