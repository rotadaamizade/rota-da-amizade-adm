import Carousel from "nuka-carousel";
import "./ImgCarousel.css";

function ImgCarousel(props) {
    const arrowLeftIcon = (
        <svg id="Layer_1" viewBox="0 0 66.91 122.88">
            <g>
                <path d="M64.96,111.2c2.65,2.73,2.59,7.08-0.13,9.73c-2.73,2.65-7.08,2.59-9.73-0.14L1.97,66.01l4.93-4.8l-4.95,4.8 c-2.65-2.74-2.59-7.1,0.15-9.76c0.08-0.08,0.16-0.15,0.24-0.22L55.1,2.09c2.65-2.73,7-2.79,9.73-0.14 c2.73,2.65,2.78,7.01,0.13,9.73L16.5,61.23L64.96,111.2L64.96,111.2L64.96,111.2z" />
            </g>
        </svg>
    );

    const arrowRightIcon = (
        <svg id="Layer_1" viewBox="0 0 66.91 122.88">
            <g>
                <path d="M1.95,111.2c-2.65,2.72-2.59,7.08,0.14,9.73c2.72,2.65,7.08,2.59,9.73-0.14L64.94,66l-4.93-4.79l4.95,4.8 c2.65-2.74,2.59-7.11-0.15-9.76c-0.08-0.08-0.16-0.15-0.24-0.22L11.81,2.09c-2.65-2.73-7-2.79-9.73-0.14 C-0.64,4.6-0.7,8.95,1.95,11.68l48.46,49.55L1.95,111.2L1.95,111.2L1.95,111.2z" />
            </g>
        </svg>
    );

    const params = {
        disableEdgeSwiping: true,
        defaultControlsConfig: {
            nextButtonClassName: "carouselNextButton",
            nextButtonText: " ",
            prevButtonClassName: "carouselPrevButton",
            prevButtonText: " ",
        },
    };

    return (
        <Carousel
            className="carouselContainer"
            {...params}
            // disableEdgeSwiping= {true}
            // renderCenterLeftControls={({ previousSlide }) => (
            //     <button onClick={previousSlide} className="arrowleftIcon" aria-label="next">
            //         {arrowLeftIcon}
            //     </button>
            // )}
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
