import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CalendarRange } from "lucide-react";
import { useRouter } from "next/router";
import { getFreelancerAcceptedJobs } from "@/blockchain/utils";
import { useAccount } from "wagmi";

function JobPostings() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [jobs, setJobs] = useState();

  useEffect(() => {
    getFreelancerAcceptedJobs(address!).then((jobData) => {
      // @ts-ignore
      setJobs(jobData);
      console.log(jobData);
    });
  }, [isConnected, address]);
  return (
    <section className="mt-4 font-outfit">
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {/* @ts-ignore */}
        {jobs?.length > 0 ? (
          jobs?.map((post, idx) => (
            <div
              className="flex flex-col w-full gap-8 p-4 transition-all duration-300 border rounded lg:flex-ro md:justify-between md:items-center hover:-translate-y-1 bg-app-grey-light md:p-8 border-white/10"
              key={idx}
            >
              <div className="flex flex-col gap-4">
                <h2 className="px-2 py-1 font-medium rounded bg-app-slate-blue w-fit">
                  Category
                </h2>
                <h1 className="text-2xl font-semibold">
                  Digital Marketing Manager
                </h1>
                <div className="flex items-center gap-4 text-base">
                  <p>
                    <span className="font-medium">8000</span> USD
                  </p>
                  <p>•</p>
                  <p className="flex items-center gap-2">
                    <CalendarRange strokeWidth={1.5} size={18} /> 2 days ago
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base font-semibold">Assigned by: </span>
                <h1 className="text-base font-semibold">Client 1</h1>
              </div>
              <Button
                onClick={() =>
                  router.push(`/dashboard/freelancer/posting/${idx}`)
                }
                variant={"secondary"}
                className="w-full h-12 text-base"
              >
                View Job
              </Button>
            </div>
          ))
        ) : (
          <p className="py-4 font-bold text-center text-red-500 bg-red-800/20 md:col-span-2 lg:col-span-3">
            No Jobs Added Here
          </p>
        )}
      </div>
    </section>
  );
}

export default JobPostings;
