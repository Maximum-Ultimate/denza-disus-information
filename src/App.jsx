import { createSignal, onCleanup, onMount } from "solid-js";
import { Router, Route, useNavigate } from "@solidjs/router";
import Loading from "./layouts/Loading";
import NotFoundPage from "./layouts/NotFoundPage";
import Home from "./layouts/components/Home";
import bgmGame from "./assets/sfx/bgGeely.wav";
import bgDenza from "./assets/img/bgDisus.webp";
import MainContent from "./layouts/components/MainContent";
import { initBGM, playBGM } from "./layouts/helper/bgmStore";

let handleUserInteraction;

function App() {
  const [loading, setLoading] = createSignal(true);
  const [hasPlayed, setHasPlayed] = createSignal(false);

  onMount(() => {
    initBGM(bgmGame);

    handleUserInteraction = () => {
      playBGM();
      document.removeEventListener("click", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleUserInteraction);
  });

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <div
      class="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{
        "background-image": `url(${bgDenza})`,
        "background-size": "cover",
        "background-position": "center",
      }}
    >
      {loading() ? (
        <Loading />
      ) : (
        <Router>
          <Route path="/" component={Home} />
          <Route path="/main" component={MainContent} />
          <Route path="/loading" component={Loading} />
          <Route path="/*" component={NotFoundPage} />
        </Router>
      )}
      <button
        onClick={() =>
          (window.location.href = "https://vinfast-puzzle-game.senimankode.id")
        }
        class="absolute z-50 bottom-5 left-5 bg-white px-10 py-4 text-2xl uppercase opacity-0"
      >
        Kembali
      </button>
    </div>
  );
}

export default App;
