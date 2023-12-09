import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import TimeAgo from "javascript-time-ago";
import { CalendarRange } from "lucide-react";
import en from "javascript-time-ago/locale/en";
import { useRouter } from "next/router";
import { getAllPostData } from "@/blockchain/utils";
import { utils } from "ethers";
import { useAccount } from "wagmi";
import { timeConverter } from "@/lib/utils";
type Posting = Readonly<{
  id: string;
  category: Category;
  title: string;
  location: string;
  pay: number;
  experience: Experience;
  description: string[];
  responsibilities: string[];
  benefits: string[];
  client: {
    name: string;
    image: string;
  };
  walletAddress: string;
  clientId?: string;
  createdAt?: number;
}>;

type Experience = "Beginner" | "Intermediate" | "Expert";
type Category =
  | "Accounting"
  | "Business & Consulting"
  | "Human Research"
  | "Marketing & Finance"
  | "Design & Development"
  | "Finance Management"
  | "Project Management"
  | "Customer Service"
  | "Healthcare"
  | "Education"
  | "Engineering";

function ClientPostings() {
  const router = useRouter();
  const { address } = useAccount();

  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const [postings, setPostings] = useState<Posting[]>([]);

  useEffect(() => {
    getAllPostData().then((data) =>
      setPostings(
        (data as Posting[]).filter((post) => post.clientId === address)
      )
    );
  }, [address]);

  return (
    <section className="mt-4 font-outfit">
      <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
        {postings.map((post, idx) => (
          <div
            className="flex flex-col w-full gap-8 p-4 transition-all duration-300 border rounded lg:flex-ro md:justify-between md:items-center hover:-translate-y-1 bg-app-grey-light md:p-8 border-white/10"
            key={idx}
          >
            <div className="flex flex-col gap-4">
              <h2 className="px-2 py-1 font-medium rounded bg-app-slate-blue w-fit">
                {post.category}
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
                  <CalendarRange strokeWidth={1.5} size={18} />{" "}
                  {timeAgo.format(new Date(timeConverter(post.createdAt!)))}
                </p>
              </div>
            </div>
            {/* <div className="flex items-center gap-4">
              <div>
                <Image
                  unoptimized
                  className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1770&amp;q=80"
                  alt="company logo"
                  width={100}
                  height={100}
                />
              </div>
              <div className="">
                <h1 className="text-base font-semibold">Freelancer 1</h1>
                <div className="flex gap-4 text-base font-medium">
                  <p>Junior</p>
                  <p>|</p>
                  <p>⭐⭐⭐⭐</p>
                </div>
              </div>
            </div> */}
            <Button
              onClick={() => router.push(`/dashboard/client/posting/${idx}`)}
              variant={"secondary"}
              className="w-full h-12 text-base"
            >
              View Posting
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ClientPostings;
