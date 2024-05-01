import "./page.css";

import { Translator } from "@/components/Translator/Translator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Translator />
    </main>
  );
}
