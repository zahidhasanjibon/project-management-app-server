import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Header from "../components/teams/Header";
import TeamCardWrapper from "../components/teams/TeamCardWrapper";

export default function Team() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200">
        <Navigation />
        <Header />

        <TeamCardWrapper />
      </div>

      <Footer />
    </>
  );
}
