import CourseComponent from "@/app/(components)/CourseComponent/CourseComponent";
import getBasketItems from "@/app/actions/getBasketItems";
import myUser from "@/app/actions/getUser";



export default async function page() {

    const courses = await getBasketItems();
    const currentUser = await myUser();

  return (
    <div>
        <div className="p-12 flex gap-2 flex-wrap">
        {courses.map((item:any) => (
            <CourseComponent
            key={item.id}
            currentUser={currentUser}
            data={item}
            />
        ))}
        </div>
    </div>
  )
}