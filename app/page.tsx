import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SliderMain from "./(components)/Slider/SliderMenu";

const images = ["/a.jpg", "b.jpg"];

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <SliderMain images={images} />
      <h1>Home</h1>
      <h1>SSR</h1>
      <h1>{JSON.stringify(session)}</h1>
    </main>
  );
}
