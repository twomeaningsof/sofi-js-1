import { getTeamName } from "../utils/getTeamName.js";
import { getTotalScore } from "../utils/getTotalScore.js";
import { getRandomPlayer } from "../utils/getRandomPlayer.js";
import { getPromise } from "../utils/getPromise.js";

const getPlayers = async (number) =>
  await getPromise("getPlayers", () =>
    Array.from(Array(number), getRandomPlayer)
  );

const getTeams = async (numberOfPlayers, numberOfTeams) =>
  await getPromise(
    "getTeams",
    async () =>
      await Promise.all(
        Array.from(
          Array(numberOfTeams),
          async () => await getPlayers(numberOfPlayers)
        )
      ),
    "getPlayers"
  );

const getTeamSummaries = async (teams) =>
  await getPromise(
    "getTeamSummaries",
    () =>
      teams.map((team) => ({
        name: getTeamName(team),
        averageScore: Math.round(getTotalScore(team) / team.length),
      })),
    "getTeams"
  );

// I leave the console.log as an example; generate 10 teams, 2 players each.
// Afterwards transform each to {name:xxx, averageScore:xxx }

console.log(await getTeamSummaries(await getTeams(2, 10)));
