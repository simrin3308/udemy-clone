import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SliderMain from "./(components)/Slider/SliderMenu";
import getAllCourses from "./actions/getAllCourses";
import CourseComponent from "./(components)/CourseComponent/CourseComponent";

const images = ["/a.jpg", "b.jpg"];

interface HomeProps {
  searchParams: string;
}

export default async function Home({ searchParams }: HomeProps) {
  const session = await getServerSession(authOptions);
  const courses = await getAllCourses(searchParams);
  return (
    <main>
      <SliderMain images={images} />

      <div>
        <div className="flex flex-wrap px-8">
          {courses.map((item: any) => (
            <CourseComponent key={item.id} data={item} />
          ))}
        </div>
      </div>

      <h1>Home</h1>
      <h1>SSR</h1>
      <h1>{JSON.stringify(session)}</h1>
    </main>
  );
}
