import { useNavigate } from "react-router-dom";

interface CardGameProps{
    image: string;
    gameName: string;
    activated: boolean;
    page: string;
}

export function CardGame({image, gameName, activated, page}: CardGameProps){
    const navigate = useNavigate();
    return(
        <a onClick={() => navigate(page)} className={"relative w-60" + (activated ? "" : " hover:blur-sm hover:sepia hover:duration-200 cursor-not-allowed")}>
            <div id="card-game">
                <div className='z-10' style={{margin: 2}}>
                <img src={image} alt={gameName} className={"rounded-lg"} />
                </div>
            </div>
        </a>
    );
}