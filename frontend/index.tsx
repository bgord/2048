import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import { random } from "lodash";
import useStatemachine from "@cassiozen/usestatemachine";

type TileType = number | null;

type MoveType = "ArrowUp" | "ArrowRight" | "ArrowDown" | "ArrowLeft";

type BoardType = [
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType,
  TileType
];

class Game {
  static emptyBoard: BoardType = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  static defaultScore = 0;

  static isProperMove(value: string): value is MoveType {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(value);
  }

  static initializeBoard(): BoardType {
    const board = Array.from(Game.emptyBoard) as BoardType;

    const randomTileIndex = random(board.length - 1);
    board[randomTileIndex] = 2;

    return board;
  }

  static getScore(board: BoardType) {
    let score = Game.defaultScore;

    for (const tile of board) {
      if (tile && tile > score) {
        score = tile;
      }
    }

    return score;
  }
}

function App() {
  const [state, send] = useStatemachine({
    context: { board: Game.emptyBoard, score: Game.defaultScore },
    initial: "idle",
    states: {
      idle: {
        on: { START: "playing" },
        effect({ setContext }) {
          setContext(() => ({
            score: Game.defaultScore,
            board: Game.emptyBoard,
          }));

          return () => {
            const board = Game.initializeBoard();

            setContext(() => ({
              score: Game.getScore(board),
              board,
            }));
          };
        },
      },
      playing: {
        on: {
          ArrowUp: "playing",
          ArrowRight: "playing",
          ArrowDown: "playing",
          ArrowLeft: "playing",
          FINISH: "finished",
          RESET: "idle",
        },
        effect({ event, setContext }) {
          if (event.type.startsWith("Arrow")) {
            setContext((context) => ({
              ...context,
              score: Game.getScore(context.board),
            }));
          }
        },
      },
      finished: { on: { PLAY_AGAIN: "idle" } },
    },
  });

  useEffect(() => {
    document.body.addEventListener("keydown", (event) =>
      Game.isProperMove(event.key) ? send(event.key) : undefined
    );
  }, []);

  return (
    <main
      data-display="flex"
      data-main="center"
      data-cross="center"
      data-pt="72"
    >
      {state.value === "idle" && (
        <button
          class="c-button"
          data-variant="primary"
          onClick={() => send("START")}
        >
          Play 2048
        </button>
      )}

      {state.value === "playing" && (
        <div data-display="flex" data-direction="column">
          <h2 data-mx="auto" data-mb="48">
            The game of 2048
          </h2>

          <h3 data-mx="auto" data-mb="48">
            Score: {state.context.score}
          </h3>

          <ul
            data-display="flex"
            data-bc="gray-400"
            data-bw="1"
            style={{ maxWidth: "402px" }}
          >
            {state.context.board.map((tile, index) => (
              <li
                data-display="flex"
                data-main="center"
                data-cross="center"
                data-bg="gray-300"
                data-bc="gray-400"
                data-bw="1"
                key={index}
                style={{ height: "100px", width: "100px" }}
              >
                {tile}
              </li>
            ))}
          </ul>

          <div data-display="flex" data-direction="column" data-mt="48">
            <button
              class="c-button"
              data-variant="bare"
              onClick={() => send("ArrowUp")}
            >
              Up
            </button>
            <div data-mx="auto">
              <button
                class="c-button"
                data-variant="bare"
                data-mx="24"
                onClick={() => send("ArrowLeft")}
              >
                Left
              </button>
              <button
                class="c-button"
                data-variant="bare"
                data-mx="24"
                onClick={() => send("ArrowDown")}
              >
                Down
              </button>
              <button
                class="c-button"
                data-variant="bare"
                data-mx="24"
                onClick={() => send("ArrowRight")}
              >
                Right
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

render(<App />, document.querySelector("#root") as Element);
