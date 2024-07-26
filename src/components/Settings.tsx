import React, { SetStateAction } from "react";

interface SettingsProps {
  username: string;
  setUsername: React.Dispatch<SetStateAction<string>>;
  fps: number;
  setFps: React.Dispatch<SetStateAction<number>>;
  setIsGamePlaying: React.Dispatch<SetStateAction<boolean>>;
}

const Settings: React.FC<SettingsProps> = ({
  username,
  setUsername,
  fps,
  setFps,
  setIsGamePlaying,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleFpsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFps(parseInt(event.target.value));
  };

  const handleStartGame = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setIsGamePlaying(true);
  };

  return (
    <div className="settings-container">
      <h2
        style={{
          margin: "5px 0px",
        }}
      >
        Game Settings
      </h2>
      <div className="settings-fields">
        <div>
          <h4>Name:</h4>
          <input type="text" value={username} onChange={handleInputChange} />
        </div>
        <div>
          <h4>Game Speed:</h4>
          <input type="text" value={fps} onChange={handleFpsChange} />
        </div>
      </div>
      <button
        onClick={handleStartGame}
        style={{
          margin: "10px 0px",
        }}
      >
        Start Game
      </button>
    </div>
  );
};

export default Settings;
