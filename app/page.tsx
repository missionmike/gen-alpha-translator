import "./page.css";

import Link from "next/link";
import { Translator } from "@/components/Translator/Translator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-1 lg:p-2">
      <Translator />
      <footer className="text-center text-white text-sm pb-6 sm:pb-10">
        from your friends 🦥{" "}
        <Link
          href="https://www.sleepyslawths.com/"
          className="text-purple-300 underline"
          target="_blank"
        >
          sleepyslawths.com
        </Link>{" "}
        🦥 <span className="ml-5 mr-5 text-gray-400">|</span> explore the code
        on{" "}
        <Link
          href="https://github.com/missionmike/gen-alpha-translator"
          className="text-purple-300 underline"
          target="_blank"
        >
          GitHub
        </Link>
      </footer>
    </main>
  );
}
