
interface CardGameProps{
    image: string;
    gameName: string;
    activated: boolean;
}

export function CardGame({image, gameName, activated}: CardGameProps){
    return(
        <a href={activated ? "../pages/lolStatus" : ""} className={"relative w-60" + (activated ? "" : " hover:blur-sm hover:sepia hover:duration-200 cursor-not-allowed")}>
            <div id="card-game">
                <div className='z-10' style={{margin: 2}}>
                <img src={image} alt={gameName} className={"rounded-lg"} />
                </div>
            </div>
        </a>
    );
}