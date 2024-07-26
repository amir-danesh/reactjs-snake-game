import React from "react";
import { Stat } from "../types/types";
import { GAME_BOARD_LIST_SIZE } from "../constants/constants";

interface ScoreBoardProps {
  stats: Stat[];
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ stats }) => {
  return (
    <table>
      <caption>Snake Game Score Board</caption>
      <thead>
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Name</th>
          <th scope="col">Speed</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {new Array(GAME_BOARD_LIST_SIZE).fill(0).map((_, index) => (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>{stats[index] ? stats[index].name : ""}</td>
            <td>{stats[index] ? stats[index].speed : ""}</td>
            <td>{stats[index] ? stats[index].score : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ScoreBoard;
