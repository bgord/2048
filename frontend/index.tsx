import { h, render } from "preact";

function App() {
  return <main>2048</main>;
}

render(<App />, document.querySelector("#root") as Element);
