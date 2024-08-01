"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [meetingState, setMeetingState] = React.useState<
    "isScheduledMeeting" | "isJoinigMeeting" | "isInstantMeeting" | undefined
  >();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [call, setCall] = useState<Call>();
  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: "Please select a date and time" });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Call not created");
      const startsAt =
        values.dateTime.toISOString() || new Date().toISOString();
      const description = values.description || "Instant meeting";
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCall(call);
      if (!values.description) {
        router.push(`/meeting/${id}`);
      }
      toast({
        title: "Meeting created",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Failed to create meeting",
      });
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call?.id}`;

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
      {!call ? (
        <MeetingModel
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create a meeting"
          onClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-3 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 "
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full gap-2.5">
            <label className="text-base font-normal leading-[22px] text-sky-2">
              Select date and time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(e) => setValues({ ...values, dateTime: e! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={25}
              timeCaption="time"
              dateFormat="MMMM d,yyyy h:mm aa"
              className="w-full rounded bg-dark-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isScheduledMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting created"
          className="text-center"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "Meeting ID copied to clipboard",
            });
          }}
          buttonIcon="/icons/copy.svg"
          buttontext="Copy Meeting ID"
          image="/icons/checked.svg"
        />
      )}
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
