import Feed from "@/components/Feed";
import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare } from "lucide-react";

export default function Home() {
  return (
    <main>
      <div id="header" className="text-center">
        <h1 className="font-extrabold mt-40">
          Branch-prompt
        </h1>

        <h4 className="text-gray-300 font-light my-6 text-lg sm:text-xl">
          Where&apos;s all the gossip? The Secrets? It&apos;s here.<br /> Share all your secrets, confessions and gossip <span className="font-extrabold text-purple-600">anonymously</span> at Branch-prompt <br />
        </h4>

        <h4 className="font-extralight text-gray-400">Exclusive to <span className="italic">KKWIEER</span> Campus and students*</h4>

        <div className="flex flex-col sm:flex-row items-center justify-center mt-20 mb-5">
          <h4>You can have one of these too!</h4>
          <Button variant="link">Create new prompt <ArrowUpRightFromSquare size={18} className="mx-1" /></Button>
        </div>
      </div>

      <Feed />
    </main>
  );
}
