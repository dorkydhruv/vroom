"use client";
import React from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = React.useState<
    "isScheduledMeeting" | "isJoinigMeeting" | "isInstantMeeting" | undefined
  >();
  const createMeeting = () => {
    
  };
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        title="New meeting"
        description="Create a new meeting"
        icon="/icons/add-meeting.svg"
        onClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        title="Schedule a meeting"
        description="Plan a meeting in advance"
        icon="/icons/schedule.svg"
        onClick={() => setMeetingState("isScheduledMeeting")}
        className="bg-blue-1"
      />

      <HomeCard
        title="View Recordings"
        description="View all your recordings"
        icon="/icons/recordings.svg"
        onClick={() => router.push("/recordings")}
        className="bg-purple-1"
      />
      <HomeCard
        title="Join a meeting"
        description="Join a meeting with a code"
        icon="/icons/join-meeting.svg"
        onClick={() => setMeetingState("isJoinigMeeting")}
        className="bg-yellow-1"
      />
      <MeetingModel
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an instant meeting"
        className="text-center"
        buttontext="Start Meeting"
        onClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
