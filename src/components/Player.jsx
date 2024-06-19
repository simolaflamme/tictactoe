
import { useState } from "react";
export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEdited, setIsEdited] = useState(false);

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    function handleEditClick() {
        setIsEdited((editing) => !editing);
        if (isEdited) {
            onChangeName(symbol ,playerName);
        }

    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    if (isEdited) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
    }
    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEditClick}>{isEdited ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}