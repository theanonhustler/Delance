import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { CalendarRange } from "lucide-react";
import ViewFreelancerProfileDialog from "./ViewFreelancerProfileDialog";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { getAllPostData } from "@/blockchain/utils";
import { utils } from "ethers";

function Notifications() {
  const router = useRouter();
  const { address } = useAccount();

  const [postings, setPostings] = useState<Posting[]>([]);

  useEffect(() => {
    getAllPostData().then((data) => setPostings(data as Posting[]));
  }, [address]);

  return (
    <section className="mt-4 font-outfit">
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {postings.filter((post) =>
          // @ts-ignore
          post?.freelancerRequests.includes(address)
        ) ? (
          postings
            .filter((post) =>
              // @ts-ignore
              post?.freelancerRequests.includes(address)
            )
            ?.map((post, idx) => {
              return (
                <div
                  className="flex flex-col w-full gap-8 p-4 transition-all duration-300 border rounded lg:flex-ro md:justify-between md:items-center hover:-translate-y-1 bg-app-grey-light md:p-8 border-white/10"
                  key={idx}
                >
                  <div className="flex flex-col gap-4">
                    <h2 className="px-2 py-1 font-medium rounded bg-app-slate-blue w-fit">
                      Category
                    </h2>
                    <h1 className="text-2xl font-semibold">{post.title}</h1>
                    <div className="flex items-center gap-4 text-base">
                      <p>
                        <span className="font-medium">
                          {/* @ts-ignore */}
                          {utils.formatEther(post.payInCELO)}
                        </span>{" "}
                        CELO
                      </p>
                      <p>•</p>
                      <p className="flex items-center gap-2">
                        <CalendarRange strokeWidth={1.5} size={18} /> 2 days ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-base font-semibold">
                      Assigned by:{" "}
                    </span>
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
              );
            })
        ) : (
          <p className="py-4 font-bold text-center text-red-500 bg-red-800/20 md:col-span-2 lg:col-span-3">
            No Jobs Added Here
          </p>
        )}
      </div>
    </section>
  );
}

export default Notifications;
