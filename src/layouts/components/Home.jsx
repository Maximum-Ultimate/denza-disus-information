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
        <div class="flex justify-center border-2 border-white bg-gradient-to-b from-[#cbcece] to-[#C7915D] px-10 py-20 mx-16 rounded-4xl">
          <div class="rounded-2xl p-1  shadow-2xl">
            <div
              class="w-full text-white px-6 py-28 rounded-2xl border border-white bg-gradient-to-b from-[#aeb7b7] to-[#C7915D] backdrop-blur-sm text-center"
              style={{ "font-family": "InterBold" }}
            >
              <h1 class="text-[55px] font-bold mb-4">DiSus TECHNOLOGY</h1>
              <div class="flex justify-center my-8">
                <hr class="w-[80%] h-[5px] bg-gradient-to-r from-transparent via-white to-transparent rounded-full opacity-70 border-none" />
              </div>
              <div
                class="py-12 px-3 mx-10 bg-gradient-to-b from-[#AB9176] to-[#B08155] rounded-[1.5em]"
                style={{ "font-family": "InterRegular" }}
              >
                <p class="text-[35px] px-8 leading-snug text-justify">
                  {/* An intelligent suspension system developed by Denza, an
                  electric vehicle brand. This system consists of several
                  components such as DiSus-C (active suspension) and DiSus-A
                  (adaptive suspension), designed to enhance comfort, stability,
                  and driving performance */}
                  Developed by BYD, DiSus is an Intelligent body control system
                  designed to enhance performance and comfort, especially for
                  new energy vehicles (NEVs). It continuously adjusts the
                  suspension and body movemenet in real time, ensuring a
                  smoother, safer, and more responsive
                </p>
                <p class="text-[35px] px-8 leading-snug text-center">
                  driving experience.
                </p>
              </div>
              <p
                class="text-[35px] px-3 mt-10 leading-snug text-justify"
                style={{ "font-family": "InterRegular" }}
              >
                {/* Do you want to know more about DISUS Technology? Discover how
                DENZA redefines */}
                Want to learn more about DiSus Technology?
              </p>
              <p class="text-[35px]" style={{ "font-family": "InterRegular" }}>
                Click below to explore your options.
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleNext}
          class="bg-white/20 mt-12 mb-16 px-20 py-4 rounded-xl z-10 text-[50px] font-bold border border-white text-white relative transition-all duration-300 active:scale-90 glow-only"
          style={{
            "font-family": "GeelyBold",
            "text-shadow":
              "0 0 15px rgba(255, 165, 0, 0.9), 0 0 10px rgba(255, 165, 0, 0.7)",
          }}
        >
          See More
        </button>
      </div>
    </div>
  );
}
