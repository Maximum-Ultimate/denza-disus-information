import { useNavigate } from "@solidjs/router";
import styles from "../App.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div class="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-5">
      <div
        class={`flex flex-col items-center mt-64 ${styles.fadeIn}`}
        style={{ fontFamily: "InterBold" }}
      >
        <div
          class="w-full max-w-7xl mx-auto px-8 py-6 text-white text-[50px] space-y-2 text-center leading-tight rounded-2xl border border-white bg-[linear-gradient(to_right,_#729eb8,_#96b6c8,_#729eb8)] shadow-[0_0_20px_#90e0ff] backdrop-blur-sm"
          style={{ "font-family": "InterBold" }}
        >
          <h1>
            Kamu salah alamat, klik tombol di bawah untuk kembali ke menu utama
          </h1>
        </div>
        {/* Tombol Aksi */}
        <div class="flex gap-5 mt-4">
          <button
            onClick={handleBackHome}
            class="w-full mb-24 mt-16 px-10 py-3 rounded-2xl font-bold z-10 text-white bg-[linear-gradient(to_right,_#155fc4,#48b3ed,_#155fc4)] border border-white text-[65px] glow-animate text-shadow-sm text-shadow-gray-500 transition-all duration-300 active:scale-90 uppercase"
            style={{
              "font-family": "GeelyBold",
            }}
          >
            KEMBALI KE MENU UTAMA
          </button>
        </div>
      </div>
    </div>
  );
}
