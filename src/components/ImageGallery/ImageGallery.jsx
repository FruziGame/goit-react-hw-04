import ImageCard from "../ImageCard/ImageCard"
import css from "./ImageGallery.module.css"



export default function ImageGallery({images,getFullImage}) {
    return(
        <ul className={css.galleryContainer}>
	        {images.map(image => (
                <li key={image.id}>
                    <ImageCard  
                        getFullImage={getFullImage}
                        full={image.urls.full} 
                        src={image.urls.small}  
                    />
                </li>
            ))}
        </ul>

    )
}