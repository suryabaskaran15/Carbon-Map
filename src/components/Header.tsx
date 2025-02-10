import React from "react";
import syncIcon from "../assets/icons/sync.png";

interface HeaderProps {
    onSync: () => void; // Function to handle manual sync
}

const Header: React.FC<HeaderProps> = ({ onSync }) => {
    return (
        <header className="header">
            <h1>Carbon Intensity Map</h1>
            <button onClick={onSync} className="sync-button">
                <img src={syncIcon} width={"30px"} height={"30px"} />
            </button>
        </header>
    );
};

export default Header;