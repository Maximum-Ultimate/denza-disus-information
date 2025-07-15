import { useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";
import styles from "../../App.module.css";
import btnSfx from "../../assets/sfx/sfxButtonGeely.wav";
import logoDenza from "../../assets/img/logoDenza.webp";

export default function Home() {
  const [isClicked, setIsClicked] = createSignal(false);
  const navigate = useNavigate();
  const buttonSfx = new Audio(btnSfx);
  buttonSfx.volume = 1;

  const handleNext = () => {
    if (isClicked()) return;

    buttonSfx.currentTime = 0;
    buttonSfx.play();

    setIsClicked(true);
    setTimeout(() => {
      navigate("/main");
    }, 300);
  };

  return (
    <div
      class={`relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center ${styles.fadeIn}`}
    >
      <div class="absolute top-24">
        <img src={logoDenza} alt="Denza Logo" class="w-[500px] mx-auto" />
      </div>
      <div class="flex flex-col items-center">
        <div class="flex justify-center border-2 border-white bg-gradient-to-b from-[#729eb8] via-[#96b6c8] to-[#bfa485] px-10 py-20 mx-16 rounded-4xl">
          <div class="rounded-2xl p-1  shadow-2xl">
            <div
              class="w-full text-white px-6 py-28 rounded-2xl border border-white bg-gradient-to-b from-[#80a6c3] to-[#bfa485] backdrop-blur-sm text-center"
              style={{ "font-family": "InterBold" }}
            >
              <h1 class="text-[55px] font-bold mb-4">DiSus TECHNOLOGY</h1>
              <div class="flex justify-center my-8">
                <hr class="w-[80%] h-[5px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-70 border-none" />
              </div>
              <div style={{ "font-family": "InterRegular" }}>
                <p class="text-[35px] px-8 leading-snug text-justify">
                  An intelligent suspension system developed by Denza, an
                  electric vehicle brand. This system consists of several
                  components such as DiSus-C (active suspension) and DiSus-A
                  (adaptive suspension), designed to enhance comfort, stability,
                  and driving performance
                </p>
                <p class="text-[35px] px-8 leading-snug text-center">
                  across various road conditions.
                </p>
              </div>
              <p
                class="text-[35px] px-8 mt-10 leading-snug text-justify"
                style={{ "font-family": "InterRegular" }}
              >
                Do you want to know more about DISUS Technology? Discover how
                DENZA redefines
              </p>
              <p
                class="text-[35px] px-8 leading-snug text-center"
                style={{ "font-family": "InterRegular" }}
              >
                ride comfort.
              </p>
              <p
                class="text-[35px] mt-20"
                style={{ "font-family": "InterRegular" }}
              >
                Click below to explore your options.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleNext}
          class="bg-white bg-radial-white mt-12 mb-16 px-20 py-4 rounded-xl z-10 text-[50px] font-bold border border-white text-white relative transition-all duration-300 active:scale-90 glow-only"
          style={{ "font-family": "GeelyBold" }}
        >
          See More
        </button>
      </div>
    </div>
  );
}
