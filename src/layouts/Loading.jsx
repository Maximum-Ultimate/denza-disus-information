import { createSignal, onMount } from "solid-js";
import styles from "../App.module.css";
import logoDenzaOnly from "../assets/img/logoDenzaOnly.webp";

function Loading(background) {
  const [isVisible, setIsVisible] = createSignal(false);

  onMount(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  });

  return (
    <div class="w-full min-h-screen flex flex-col items-center justify-center text-center space-y-6 transition-all duration-500 ease-in-out md:pt-0">
      <div
        class={`absolute top-1/2 -translate-y-[480px] z-50 ${styles.fadeIn}`}
      >
        <img src={logoDenzaOnly} alt="Denza Logo" class="w-[450px] mx-auto" />
      </div>
      <div
        class={`flex flex-col items-center h-full shadow-none ${styles.fadeIn}`}
      >
        <p
          class="text-[70px] font-extrabold uppercase text-white tracking-wide animate-pulse"
          style={{ "font-family": "GeelyBold" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;
