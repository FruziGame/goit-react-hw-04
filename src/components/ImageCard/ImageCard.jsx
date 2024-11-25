import css from "./ImageCard.module.css"

export default function ImageCard({src,full,getFullImage}) {
    return(
            <div>
            <img src={src} alt="" 
                 className={css.image} data-full={full} onClick={getFullImage}
            />
            </div>
    )
}

