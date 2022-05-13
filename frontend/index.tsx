import { h, render } from "preact";
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

  static isProperMove(value: string): value is MoveType {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(value);
  }
}

function App() {
  const [state, send] = useStatemachine({
    context: { board: Game.emptyBoard, score: 0 },
    initial: "idle",
    states: {
      idle: { on: { START: "playing" } },
      playing: {
        on: {
          ArrowUp: "playing",
          ArrowRight: "playing",
          ArrowDown: "playing",
          ArrowLeft: "playing",
          FINISH: "finished",
          RESET: "idle",
        },
      },
      finished: { on: { PLAY_AGAIN: "idle" } },
    },
  });

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
            onKeyDown={(event) =>
              Game.isProperMove(event.key) ? send(event.key) : undefined
            }
            tabIndex={1}
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
        </div>
      )}
    </main>
  );
}

render(<App />, document.querySelector("#root") as Element);
