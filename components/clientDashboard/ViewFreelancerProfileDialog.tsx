import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

import Image from "next/image";
import { acceptJobRequest } from "@/blockchain/utils";
import toast from "react-hot-toast";

interface ViewFreelancerProfileDialogProps {
  name: string;
  experience: string;
  category: string;
  skills: string;
  walletAddress: `0x${string}`;
  jobID: number;
}

function ViewFreelancerProfileDialog({
  name,
  experience,
  category,
  skills,
  walletAddress,
  jobID,
}: ViewFreelancerProfileDialogProps) {
  const handleAccept = () => {
    toast.loading(<b>Accepting Job Request</b>, {
      id: "acceptJobRequest",
    });
    acceptJobRequest(walletAddress, jobID.toString())
      .then(() => {
        toast.success(<b>Job Request Accepted</b>, {
          id: "acceptJobRequest",
        });
      })
      .catch(() => {
        toast.error(<b>Accepting Job Request Error</b>, {
          id: "acceptJobRequest",
        });
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={"secondary"} className="w-full h-12 text-base">
            View Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Freelancer Profile</DialogTitle>
            <DialogDescription>
              <section className="mx-auto mt-4 font-outfit">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center gap-4 ">
                    <Image
                      unoptimized
                      className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
                      src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1770&amp;q=80"
                      alt="company logo"
                      width={100}
                      height={100}
                    />
                    <h1 className="text-xl font-semibold text-stone-200">
                      {name}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-2 text-stone-200 text-base my-4">
                  <span className="flex gap-2">
                    Experience Level :{" "}
                    <p className="font-medium">{experience}</p>
                  </span>
                  <span className="flex gap-2">
                    Category :<p className="font-medium">{category}</p>
                  </span>
                  <span className="flex gap-2">
                    Skills :<p className="font-medium">{skills}</p>
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAccept}
                    className="w-full h-12 text-base"
                  >
                    Accept
                  </Button>
                  {/* <Button variant={"outline"} className="w-full h-12 text-base">
                    Decline
                  </Button> */}
                </div>
              </section>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ViewFreelancerProfileDialog;
