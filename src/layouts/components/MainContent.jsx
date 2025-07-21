import { createSignal, Show, For, onMount, onCleanup } from "solid-js";
import { useNavigate } from "@solidjs/router";
import btnSfx from "../../assets/sfx/sfxButtonGeely.wav";
import logoDenza from "../../assets/img/logoDenza.webp";
import logoDenzaOnly from "../../assets/img/logoDenzaOnly.webp";
import bgDenzaBaseVideo from "../../assets/img/bgLast.webp";
import styles from "../../App.module.css";
import logoByd from "../../assets/img/logoByd.png";
import logoDenzaByd from "../../assets/img/logoDenzaByd.webp";

// Mock video import
import DisusC from "../../assets/video/lite/DisusC.mp4";
import DisusA from "../../assets/video/lite/DisusA.mp4";
import DisusP from "../../assets/video/lite/DisusP.mp4";
import DisusX from "../../assets/video/lite/DisusX.mp4";
import DisusZ from "../../assets/video/lite/DisusZ.mp4";
import DisusM from "../../assets/video/lite/DisusM.mp4";
import Swal from "sweetalert2";
import { pauseBGM, playBGM, stopBGM } from "../helper/bgmStore";

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
    title: "DiSus-P",
    description: "Intelligent Hydraulic Body Control System.",
    video: DisusP,
  },
  {
    title: "DiSus-X",
    description: "Intelligent Fully Active Body Control System.",
    video: DisusX,
  },
  {
    title: "DiSus-Z",
    description: "Intelligent Electromagnetic Body Control System.",
    video: DisusZ,
  },
  {
    title: "DiSus-M",
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

    pauseBGM();

    setTimeout(() => {
      stopBGM();

      setActiveVideo(video);
    }, 800);
  };

  const closeVideo = () => {
    buttonSfx.currentTime = 0;
    buttonSfx.play();

    playBGM();

    setTimeout(() => {
      setActiveVideo(null);
    }, 800);
  };

  const currentVideoData = () => {
    return data.find((item) => item.video === activeVideo());
  };

  return (
    <div class="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center text-white">
      {!activeVideo() && (
        // <div class="absolute top-7 w-full flex items-center justify-center gap-10">
        //   <img
        //     src={logoByd}
        //     alt="BYD Logo"
        //     class="w-[250px] mr-[-30px] h-auto object-contain"
        //   />
        //   <div class="w-[3px] h-24 bg-white"></div>
        //   <img
        //     src={logoDenza}
        //     alt="Denza Logo"
        //     class="w-[350px] h-auto object-contain"
        //   />
        // </div>
        <div
          class={`absolute flex items-center pr-7 top-16 z-50 ${styles.fadeIn}`}
        >
          <img
            src={logoDenzaByd}
            alt="Denza & BYD Logo"
            class="w-full h-auto object-contain"
          />
        </div>
      )}

      <div class="w-[800px] grid grid-cols-1 gap-12 justify-items-center text-center mt-60 z-10 px-8">
        <For each={data}>
          {(item, index) => (
            <button
              class={`group w-full flex justify-center border-2 border-white p-2 rounded-[2.5em] bg-gradient-to-b 
                    from-[#aeb7b7] to-[#C7915D] shadow-lg shadow-black
                    transition-all active:scale-90 duration-500 ${styles.fadeInSlideUp}`}
              style={{ "animation-delay": `${index() * 0.15}s` }}
              onClick={() => handleClick(item.video)}
            >
              <div class="rounded-2xl p-1 w-full">
                <div
                  class="
                    w-full text-white p-6 rounded-[2em] border border-white
                    bg-gradient-to-b 
                    from-[#aeb7b7] to-[#C7915D]
                    group-active:from-[#feffff] group-active:to-[#f8dabd] shadow-md shadow-black
                    group-active:shadow-[0_0_30px_10px_rgba(255,255,255,0.7)]
                    transition-all duration-500 text-center backdrop-blur-sm
                  "
                  style={{
                    fontFamily: "InterBold",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <h1
                    class="text-[40px] font-bold"
                    style={{
                      fontFamily: "InterBold",
                      transition: "all 0.3s ease-in-out",
                    }}
                  >
                    {item.title}
                  </h1>
                  <p
                    class="text-[22px] mt-4 leading-snug text-center"
                    style={{
                      fontFamily: "InterRegular",
                      textShadow: "0 0 6px rgba(255,255,255,0.3)",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          )}
        </For>
        <button
          onclick={() => {
            buttonSfx.currentTime = 0;
            buttonSfx.play();

            setTimeout(() => {
              navigate("/");
            }, 800);
          }}
          class={`bg-white/20 mt-12 mb-16 w-[500px] py-4 rounded-xl z-10 text-[50px] font-bold border border-white text-white relative transition-all duration-300 active:scale-90 glow-only ${styles.fadeIn}`}
          style={{
            "font-family": "GeelyBold",
            "text-shadow":
              "0 0 15px rgba(255, 165, 0, 0.9), 0 0 10px rgba(255, 165, 0, 0.7)",
          }}
        >
          Back
        </button>
      </div>

      {/* <button
        onclick={() => navigate("/")}
        class="absolute top-2 left-2 w-52 text-[50px] text-white p-6 rounded-xl border border-white bg-gradient-to-b from-[#80a6c3] to-[#bfa485] backdrop-blur-sm text-center opacity-0"
      >
        BACK
      </button> */}

      <Show when={activeVideo()}>
        <div
          class="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
          style={{
            "background-image": `url(${bgDenzaBaseVideo})`,
            "background-size": "cover",
            "background-position": "center",
          }}
        >
          {/* <div class={`absolute flex items-center top-52 gap-10 z-50 ${styles.fadeIn}`}>
            <img
              src={logoByd}
              alt="BYD Logo"
              class="w-[250px] mr-[-30px] h-auto object-contain"
            />
            <div class="w-[3px] h-24 bg-white"></div>
            <img
              src={logoDenza}
              alt="Denza Logo"
              class="w-[350px] mx-auto object-contain"
            />
          </div> */}
          <div
            class={`absolute flex items-center pr-7 top-16 z-50 ${styles.fadeIn}`}
          >
            <img
              src={logoDenzaByd}
              alt="Denza & BYD Logo"
              class="w-full h-auto object-contain"
            />
          </div>
          {/* Title */}
          <div
            class={`w-[750px] text-center flex flex-col items-center justify-center absolute top-[460px] leading-none ${styles.fadeIn}`}
          >
            <div class="absolute inset-0 bg-gradient-to-r from-[#ffffff1a] via-[#ffffffa1] to-[#ffffff1a] rounded-md blur-sm h-full"></div>
            <h1
              class="relative text-white text-[100px] font-bold leading-none"
              style={{
                fontFamily: "GeelyBold",
                textShadow: "0 0 10px rgba(255,255,255,0.6)",
              }}
            >
              {currentVideoData()?.title}
            </h1>
          </div>

          {/* Video */}
          <div class={`w-full px-2 pt-25 ${styles.fadeIn}`}>
            <video
              src={activeVideo()}
              autoplay
              loop
              playsinline
              class="w-full h-auto mx-auto rounded-xl shadow-2xl"
            />
          </div>

          {/* Close Button */}
          {/* <button
            onClick={closeVideo}
            class={`absolute bottom-72 bg-white bg-radial-white mt-12 mb-16 px-20 py-4 rounded-xl z-10 text-[50px] font-bold border border-white text-white transition-all duration-300 active:scale-90 glow-only ${styles.fadeIn}`}
            style={{ fontFamily: "GeelyBold" }}
          >
            Close
          </button> */}

          <div
            class={`flex flex-col items-center justify-center absolute bottom-56 ${styles.fadeIn}`}
          >
            <p
              class="text-white text-[40px] mt-4"
              style={{
                fontFamily: "GeelyRegular",
                textShadow: "0 0 6px rgba(255,255,255,0.4)",
              }}
            >
              {currentVideoData()?.description}
            </p>
            <button
              onClick={closeVideo}
              class={`w-[500px] bg-white/20 mt-12 mb-16 px-20 py-4 rounded-xl z-10 text-[50px] font-bold border border-white text-white transition-all duration-300 active:scale-90 glow-only ${styles.fadeIn}`}
              style={{
                "font-family": "GeelyBold",
                "text-shadow":
                  "0 0 15px rgba(255, 165, 0, 0.9), 0 0 10px rgba(255, 165, 0, 0.7)",
              }}
            >
              Back
            </button>
          </div>
        </div>
      </Show>
    </div>
  );
}
