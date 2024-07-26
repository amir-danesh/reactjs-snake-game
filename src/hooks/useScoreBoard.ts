import { useEffect, useState } from "react";
import {
  GAME_BOARD_LIST_SIZE,
  LOCAL_STORAGE_GAME_STATS_STRING,
} from "../constants/constants";
import { Stat } from "../types/types";

const isValidStatArray = (obj: any): boolean => {
  if (!Array.isArray(obj)) {
    return false;
  }

  const isArrayValidStat = obj.every(
    (item) =>
      item["name"] !== undefined &&
      item["score"] !== undefined &&
      item["speed"] !== undefined,
  );

  return isArrayValidStat;
};

export const useScoreBoard = () => {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    const localStorageStatsRaw = window.localStorage.getItem(
      LOCAL_STORAGE_GAME_STATS_STRING,
    );
    try {
      const localStorageStatsParse = JSON.parse(localStorageStatsRaw || "");
      const isValid = isValidStatArray(localStorageStatsParse);

      if (!isValid) {
        console.error("local storage stats are invalid");
        window.localStorage.removeItem(LOCAL_STORAGE_GAME_STATS_STRING);
      }

      setStats(isValid ? (localStorageStatsParse as Stat[]) : []);
    } catch {
      console.error("local storage stats are invalid");
      setStats([]);
    }
  }, []);

  const updateLocalStorage = (stats: Stat[]) => {
    window.localStorage.setItem(
      LOCAL_STORAGE_GAME_STATS_STRING,
      JSON.stringify(stats),
    );
  };

  const updateStats = ({ name, score, speed }: Stat) => {
    const newStats = stats.slice().sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score;
        } else if (a.speed !== b.speed) {
          return b.speed - a.speed;
        } else {
          return stats.indexOf(a) - stats.indexOf(b);
        }
      });
      
      const insertIndex = newStats.findIndex(item => 
        item.score < score || 
        (item.score === score && item.speed < speed)
      );
      
      if (insertIndex === -1) {
        newStats.push({
            name, score, speed
        });
      } else {
        newStats.splice(insertIndex, 0, {name, score, speed});
      }

      if(newStats.length > GAME_BOARD_LIST_SIZE) newStats.pop()

    updateLocalStorage(newStats);
    setStats(newStats);
  };

  return {
    stats,
    updateStats,
  };
};
