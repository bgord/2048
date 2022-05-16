import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import { random } from "lodash";
import useStatemachine from "@cassiozen/usestatemachine";

type TileType = { id: number; value: number | null };

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
    { id: 1, value: null },
    { id: 2, value: null },
    { id: 3, value: null },
    { id: 4, value: null },
    { id: 5, value: null },
    { id: 6, value: null },
    { id: 7, value: null },
    { id: 8, value: null },
    { id: 9, value: null },
    { id: 10, value: null },
    { id: 11, value: null },
    { id: 12, value: null },
    { id: 13, value: null },
    { id: 14, value: null },
    { id: 15, value: null },
    { id: 16, value: null },
  ];

  static defaultScore = 0;

  static isProperMove(value: string): value is MoveType {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(value);
  }

  static initializeBoard(): BoardType {
    const board = Array.from(Game.emptyBoard) as BoardType;

    return Game.spawnRandomTile(board);
  }

  static handleMove(board: BoardType, type: MoveType): BoardType {
    return this.spawnRandomTile(board);
  }

  static hasGameEnded(board: BoardType): boolean {
    return board.every((tile) => tile.value !== null);
  }

  static getScore(board: BoardType) {
    let score = Game.defaultScore;

    for (const tile of board) {
      if (tile?.value && tile.value > score) {
        score = tile.value;
      }
    }

    return score;
  }

  private static spawnRandomTile(board: BoardType): BoardType {
    const randomEmptyTileId = Game.getRandomEmptyTileId(board);

    return board.map((tile) =>
      tile.id === randomEmptyTileId ? { ...tile, value: 2 } : tile
    ) as BoardType;
  }

  private static getRandomEmptyTileId(board: BoardType): TileType["id"] {
    const emptyTiles = board.filter((tile) => tile.value === null);

    const randomEmptyTileIndex = random(emptyTiles.length - 1);

    return emptyTiles[randomEmptyTileIndex].id;
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
        effect({ context, event, setContext, send }) {
          if (event.type.startsWith("Arrow")) {
            if (!Game.isProperMove(event.type)) return;

            const boardAfterMove = Game.handleMove(context.board, event.type);

            if (Game.hasGameEnded(boardAfterMove)) {
              return send("FINISH");
            }

            setContext((context) => ({
              board: boardAfterMove,
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

          <div
            data-display="flex"
            data-cross="center"
            data-main="between"
            data-mb="24"
          >
            <h3>Score: {state.context.score}</h3>

            <button
              class="c-button"
              data-variant="secondary"
              onClick={() => send("RESET")}
            >
              Reset
            </button>
          </div>

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
                {tile.value}
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
