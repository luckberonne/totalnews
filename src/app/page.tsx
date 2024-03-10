import ExpressNews from "@/components/expressNews";
import New from "@/components/new";
import News from "@/components/news";
import NewsLeftSide from "@/components/newsLeftSide";
import { Divider } from "@nextui-org/react";

export default function Home() {
  return (
    <main>
      <div>
        <ExpressNews/>
        <News/>
      </div>
    </main>
  );
}
