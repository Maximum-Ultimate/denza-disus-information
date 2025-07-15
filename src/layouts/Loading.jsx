import { createSignal, onMount } from "solid-js";
import styles from "../App.module.css";

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
