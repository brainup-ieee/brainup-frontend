// components
import { Button } from "../../components/Button";

// assets
import landingImage from "../../assets/images/landing-original.png";
import { useEffect, useState } from "react";

const LandingSection = () => {
  const [navigation, setNavigation] = useState({
    text: "Get Started Now",
    link: "/register",
  });

  useEffect(() => {
    const userType = localStorage.getItem("user-type");
    if (userType === "teacher") {
      setNavigation({
        text: "Go to Dashboard",
        link: "/teacher-dashboard",
      });
    } else if (userType === "student") {
      setNavigation({
        text: "Go to Dashboard",
        link: "/student-dashboard",
      });
    }
  }, []);

  return (
    <section className="w-full h-[calc(100vh-7rem)] max-h-[40rem] p-8 bg-secondary rounded-3xl flex justify-between items-center">
      <div className="flex flex-col justify-center gap-4 basis-1/2">
        <h2 className="font-nunito font-extrabold text-5xl leading-tight	">
          Empower Your Classroom with BrainUp
        </h2>
        <p className="font-inter mb-4">
          Revolutionizing the Landscape of Education by Introducing Cutting-Edge
          and Innovative Learning Approaches That Transform the Way Students
          Learn and Teachers Instruct.
        </p>
        <Button link={navigation.link} text={navigation.text} />
      </div>
      <div className="flex justify-center items-center basis-1/2">
        <img src={landingImage} alt="" />
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <main className="mt-4">
      <LandingSection />
    </main>
  );
};
