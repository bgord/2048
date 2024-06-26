/* eslint-disable no-shadow */

import { h, render } from "preact";
import { useEffect } from "preact/hooks";
import useStateMachine, { t } from "@cassiozen/usestatemachine";

import { Game, ScoreType, Actions } from "../game";
import { Board } from "../board";

function App() {
  const [state, send] = useStateMachine({
    schema: { context: t<{ board: Board; score: ScoreType }>() },
    context: Game.initialize(),
    initial: "idle",
    states: {
      idle: {
        on: { START: "playing" },
        // @ts-ignore
        effect({ setContext }) {
          setContext(Game.initialize);
        },
      },
      playing: {
        on: {
          [Actions.ArrowUp]: "playing",
          [Actions.ArrowRight]: "playing",
          [Actions.ArrowDown]: "playing",
          [Actions.ArrowLeft]: "playing",
          FINISH: "finished",
          RESET: "idle",
        },
        // @ts-ignore
        effect({ context, event, setContext, send }) {
          if (event.type.startsWith("Arrow")) {
            const game = Game.handleMove(context.board, event.type);

            if (game.hasEnded) {
              return send("FINISH");
            }

            setContext(() => game);
          }
        },
      },
      finished: { on: { PLAY_AGAIN: "idle" } },
    },
  });

  useEffect(() => {
    document.body.addEventListener("keydown", (event) =>
      Game.isProperAction(event.key) ? send(event.key) : undefined
    );
  }, [send]);

  return (
    <main
      data-display="flex"
      data-direction="column"
      data-main="center"
      data-cross="center"
      data-pt="72"
    >
      <h1 data-display="flex" data-p="12" data-mb="24">
        2048
      </h1>
      {state.value === "idle" && (
        <button
          type="button"
          class="c-button"
          data-variant="primary"
          onClick={() => send("START")}
        >
          Play 2048
        </button>
      )}

      {(state.value === "playing" || state.value === "finished") && (
        <div data-display="flex" data-direction="column">
          <div
            data-display="flex"
            data-cross="center"
            data-main="between"
            data-mb="24"
          >
            <h3>Score: {state.context.score}</h3>

            <button
              type="button"
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
            {state.context.board.state.map((tile) => (
              <li
                data-display="flex"
                data-main="center"
                data-cross="center"
                data-bg="gray-300"
                data-bc="gray-400"
                data-bw="1"
                key={tile.id}
                style={{ height: "100px", width: "100px" }}
              >
                {tile.value}
              </li>
            ))}
          </ul>

          <div data-display="flex" data-direction="column" data-mt="48">
            <button
              type="button"
              class="c-button"
              data-variant="bare"
              onClick={() => send(Actions.ArrowUp)}
            >
              Up
            </button>
            <div data-mx="auto">
              <button
                type="button"
                class="c-button"
                data-variant="bare"
                data-mx="24"
                onClick={() => send(Actions.ArrowLeft)}
              >
                Left
              </button>
              <button
                type="button"
                class="c-button"
                data-variant="bare"
                data-mx="24"
                onClick={() => send(Actions.ArrowDown)}
              >
                Down
              </button>
              <button
                type="button"
                class="c-button"
                data-variant="bare"
                data-mx="24"
                onClick={() => send(Actions.ArrowRight)}
              >
                Right
              </button>
            </div>
          </div>
        </div>
      )}

      {state.value === "finished" && <div>FINISHED</div>}
    </main>
  );
}

render(<App />, document.querySelector("#root") as Element);
