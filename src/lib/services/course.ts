export type Course = {
  id: number;
  title: string;
  detail: string;
  date: string;
  view: number;
  picture: string;
};

type CourseResponse = {
  data: Course[];
  meta: {
    status: string;
    status_code: number;
  };
};

export async function getCourses(): Promise<Course[]> {
  const response = await fetch("https://api.codingthailand.com/api/course");
  const courseResponse: CourseResponse = await response.json();
  return courseResponse.data;
}
