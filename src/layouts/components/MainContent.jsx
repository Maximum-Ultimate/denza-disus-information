import { createSignal, Show, For, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import btnSfx from "../../assets/sfx/sfxButtonGeely.wav";
import logoDenza from "../../assets/img/logoDenza.webp";
import bgDenzaBaseVideo from "../../assets/img/bgLast.webp";
import styles from "../../App.module.css";

// Mock video import
import DisusC from "../../assets/video/lite/DisusC.mp4";
import DisusA from "../../assets/video/lite/DisusA.mp4";
import DisusP from "../../assets/video/lite/DisusP.mp4";
import DisusX from "../../assets/video/lite/DisusX.mp4";
import DisusZ from "../../assets/video/lite/DisusZ.mp4";
import DisusM from "../../assets/video/lite/DisusM.mp4";
import Swal from "sweetalert2";

const data = [
  {
    title: "DiSus-C",
    description: "Intelligent Damping Body Control Systemride comfort.",
    video: DisusC,
  },
  {
    title: "Disus-A",
    description: "Intelligent Air Body Control System.",
    video: DisusA,
  },
  {
    title: "Disus-P",
    description: "Intelligent Hydraulic Body Control System.",
    video: DisusP,
  },
  {
    title: "Disus-X",
    description: "Intelligent Fully Active Body Control System.",
    video: DisusX,
  },
  {
    title: "Disus-Z",
    description: "Intelligent Electromagnetic Body Control System.",
    video: DisusZ,
  },
  {
    title: "Disus-M",
    description: "Intelligent Magnetorheological Body Control System.",
    video: DisusM,
  },
];

export default function MainContent() {
  const [activeVideo, setActiveVideo] = createSignal(null);
  const buttonSfx = new Audio(btnSfx);
  buttonSfx.volume = 1;

  const navigate = useNavigate();

  // ===== IDLE TIMER LOGIC START =====
  let idleTimeout;
  const idleTime = 15 * 60 * 1000; // 15 menit dalam ms

  const resetIdleTimer = () => {
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      Swal.fire({
        title: "Kembali ke awal",
        text: "Tidak ada aktivitas, sistem akan kembali ke halaman utama.",
        icon: "info",
        timer: 3000,
        showConfirmButton: false,
        background: "transparent",
        customClass: {
          popup: "custom-swal",
          title: "custom-swal-title",
          htmlContainer: "custom-swal-text",
          icon: "custom-swal-icon",
        },
      }).then(() => {
        window.location.href = "/";
      });
    }, idleTime);
  };

  onMount(() => {
    resetIdleTimer();
    const events = ["mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetIdleTimer));

    onCleanup(() => {
      clearTimeout(idleTimeout);
      events.forEach((event) =>
        window.removeEventListener(event, resetIdleTimer)
      );
    });
  });

  const handleClick = (video) => {
    buttonSfx.currentTime = 0;
    buttonSfx.play();

    setTimeout(() => {
      setActiveVideo(video);
    }, 800);
  };

  const closeVideo = () => {
    buttonSfx.currentTime = 0;
    buttonSfx.play();

    setTimeout(() => {
      setActiveVideo(null);
    }, 800);
  };

  return (
    <div class="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-white">
      <div class={`absolute top-24 z-50 ${styles.fadeIn}`}>
        <img src={logoDenza} alt="Denza Logo" class="w-[500px] mx-auto" />
      </div>

      <div class="grid grid-cols-1 gap-12 mt-48 z-10 px-8">
        <For each={data}>
          {(item, index) => (
            <button
              class={`flex justify-center border-2 border-white bg-gradient-to-b from-[#729eb8] via-[#96b6c8] to-[#bfa485] p-4 rounded-[2.5em] transition-all active:scale-90 duration-300 ${styles.fadeInSlideUp}`}
              style={{ "animation-delay": `${index() * 0.15}s` }}
              onClick={() => handleClick(item.video)}
            >
              <div class="rounded-2xl p-1 shadow-2xl w-full">
                <div
                  class="w-full text-white p-6 rounded-[2em] border border-white bg-gradient-to-b from-[#80a6c3] to-[#bfa485] backdrop-blur-sm text-center"
                  style={{ "font-family": "InterBold" }}
                >
                  <h1 class="text-[40px] font-bold">{item.title}</h1>
                  <p
                    class="text-[22px] mt-4 leading-snug text-center"
                    style={{ "font-family": "InterRegular" }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          )}
        </For>
      </div>

      <button
        onclick={() => navigate("/")}
        class="absolute top-2 left-2 w-52 text-[50px] text-white p-6 rounded-xl border border-white bg-gradient-to-b from-[#80a6c3] to-[#bfa485] backdrop-blur-sm text-center opacity-0"
      >
        BACK
      </button>

      <Show when={activeVideo()}>
        <div
          class="fixed inset-0 z-40 flex items-center justify-center bg-black"
          style={{
            "background-image": `url(${bgDenzaBaseVideo})`,
            "background-size": "cover",
            "background-position": "center",
          }}
        >
          <div class={`w-full px-2 pt-25 ${styles.fadeIn}`}>
            <video
              src={activeVideo()}
              autoplay
              loop
              playsinline
              class="w-full h-auto mx-auto rounded-xl shadow-2xl"
            />
          </div>
          <button
            onClick={closeVideo}
            class={`absolute bottom-72 bg-white bg-radial-white mt-12 mb-16 px-20 py-4 rounded-xl z-10 text-[50px] font-bold border border-white text-white transition-all duration-300 active:scale-90 glow-only ${styles.fadeIn}`}
            style={{ "font-family": "GeelyBold" }}
          >
            Close
          </button>
        </div>
      </Show>
    </div>
  );
}
