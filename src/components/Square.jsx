import { useState } from "react/cjs/react.development";

const Square = ({handleClick, position, mark, whoWon}) => {

    const [winState, setWinState] = useState(false);

    return (
        <div className={`square mark${mark}  ${winState ? 'won' + whoWon : ""}`} onClick={() => handleClick(position)}>
        </div>
    )
}


export default Square;