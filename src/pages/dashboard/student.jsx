import { ListContainer } from "../../components/listContainer";

const CLASSROOMS = [
  {
    id: 1,
    title: "Classroom 1",
    description: "This is classroom 1",
  },
  {
    id: 2,
    title: "Classroom 2",
    description: "This is classroom 2",
  },
  {
    id: 3,
    title: "Classroom 3",
    description: "This is classroom 3",
  },
];

const LESSONS = [
  {
    id: 1,
    title: "Lesson 1",
    description: "This is lesson 1",
  },
  {
    id: 2,
    title: "Lesson 2",
    description: "This is lesson 2",
  },
  {
    id: 3,
    title: "Lesson 3",
    description: "This is lesson 3",
  },
];

const QUIZES = [
  {
    id: 1,
    title: "Quiz 1",
    description: "This is quiz 1",
  },
  {
    id: 2,
    title: "Quiz 2",
    description: "This is quiz 2",
  },
  {
    id: 3,
    title: "Quiz 3",
    description: "This is quiz 3",
  },
];

export const StudentDashboard = () => {
  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Student Dashboard</h1>
      <section className="flex flex-col gap-2 border-b-2 border-b-primary pb-2">
        <h2 className="text-xl font-semibold">My Classrooms</h2>
        <ListContainer list={CLASSROOMS} url="/classrooms" />
      </section>
      <section className="flex flex-col gap-2 border-b-2 border-b-primary pb-2">
        <h2 className="text-xl font-semibold">My Lessons</h2>
        <ListContainer list={LESSONS} url="/lessons" />
      </section>
      <section className="flex flex-col gap-2 border-b-2 border-b-primary pb-2">
        <h2 className="text-xl font-semibold">My Quizes</h2>
        <ListContainer list={QUIZES} url="/quizzes" />
      </section>
    </main>
  );
};
