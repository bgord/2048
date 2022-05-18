import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import useStatemachine, { t } from "@cassiozen/usestatemachine";

import { Game } from "../game";
import { Board } from "../board";

function App() {
  const [state, send] = useStatemachine({
    schema: {
      context: t<{ board: Board; score: number }>(),
    },
    context: {
      board: Game.initializeBoard(),
      score: Game.defaultScore,
    },
    initial: "idle",
    states: {
      idle: {
        on: { START: "playing" },
        effect({ setContext }) {
          const board = Game.initializeBoard();

          setContext(() => ({
            score: Game.getScore(board),
            board,
          }));
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
            boardAfterMove.spawnRandomTile();

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
            {state.context.board.state.map((tile, index) => (
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
