import CurrentDateTime from "@/components/CurrentDateTime";
import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[200] rounded py-2 text-center text-base font-sans">
            Upcoming meeting at: 12:30pm
          </h2>
          <CurrentDateTime />
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
