import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { POSTINGS } from "@/constants/postings";
import { getAllPostData, getClientInfo } from "@/blockchain/utils";
import { utils } from "ethers";

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

const SearchJobTitle = () => {
  const router = useRouter();
  const [postings, setPostings] = useState<Posting[]>([]);

  useEffect(() => {
    getAllPostData().then((data) => {
      // @ts-ignore

      return setPostings(data as Posting[]);
    });
  }, [router.query.title]);

  const CATEGORIES = [
    "Accounting",
    "Business & Consulting",
    "Human Research",
    "Marketing & Finance",
    "Design & Development",
    "Finance Management",
    "Project Management",
    "Customer Service",
    "Healthcare",
    "Education",
    "Engineering",
  ];
  const EXPERIENCE = ["Beginner", "Intermediate", "Expert"];

  return (
    <main className="h-full bg-[url('/assets/line-bg.png')] w-full font-outfit bg-app-grey-dark text-stone-200">
      <Header />
      <section className="p-4 md:px-16 lg:max-w-7xl lg:mx-auto font-outfit py-[50px] md:py-[80px]">
        <div className="mx-auto flex flex-col lg:max-w-3xl gap-4 text-center pb-[50px] md:pb-[80px]">
          <h2 className="text-3xl font-bold lg:text-5xl">
            {router.query.title}
          </h2>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-1 h-fit lg:sticky lg:top-24">
            <div>
              <h2 className="text-xl font-bold lg:text-3xl">Category</h2>
              <div className="flex flex-col gap-2 mt-4">
                {CATEGORIES.map((item, idx) => (
                  <Link href={`/find-a-job/${item}`} key={idx}>
                    <h1 className="px-4 py-2 text-lg transition-all duration-300 border rounded bg-app-grey-dark hover:bg-app-slate-blue border-white/10">
                      {item}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold lg:text-3xl">Job Level</h2>
              <div className="flex flex-col gap-2 mt-4">
                {EXPERIENCE.map((item, idx) => (
                  <Link href={`/find-a-job/${item}`} key={idx}>
                    <h1 className="px-4 py-2 text-lg transition-all duration-300 border rounded bg-app-grey-dark hover:bg-app-slate-blue border-white/10">
                      {item}
                    </h1>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2 md:grid-cols-2">
            {postings.filter(
              (eachData: Posting) =>
                eachData.category === router.query.title ||
                eachData.experience === router.query.title
            ).length === 0 ? (
              <p className="font-bold text-center text-red-500 md:col-span-2 animate-pulse">
                No Jobs Found for {router.query.title}
              </p>
            ) : (
              postings
                .filter(
                  (eachData: Posting) =>
                    eachData.category === router.query.title ||
                    eachData.experience === router.query.title
                )
                .map(async (job, idx) => {
                  if (!job.clientId) return null;
                  const clientInfo = await getClientInfo(job?.clientId);
                  console.log(clientInfo);
                  return (
                    <div
                      className="flex flex-col w-full gap-8 p-4 transition-all duration-300 border rounded hover:-translate-y-1 h-fit bg-app-grey-light md:p-8 border-white/10"
                      key={idx}
                    >
                      <div className="flex flex-col gap-4">
                        <h2 className="px-2 py-1 font-medium rounded bg-app-slate-blue w-fit">
                          {job.category}
                        </h2>
                        <h1 className="text-2xl font-semibold">{job.title}</h1>
                        <div className="flex items-center gap-4 text-base">
                          <p>
                            <span className="font-medium">
                              {/* @ts-ignore */}
                              {utils.formatEther(job.payInCELO)}
                            </span>{" "}
                            CELO
                          </p>
                          <p>•</p>
                          <p>{job.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <Image
                            unoptimized
                            className="w-12"
                            src="https://assets.website-files.com/63b3bf674632664abc613903/63b658d0d4a06814966f7225_company-04.png"
                            alt="company logo"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div>
                          <h1>Company Name</h1>
                          <p className="flex items-center gap-1">
                            <MapPin strokeWidth={1.5} size={16} />{" "}
                            {job.location}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={"secondary"}
                        className="h-12 text-base"
                        asChild
                      >
                        <Link href={`/posting/${idx}`}>View Posting</Link>
                      </Button>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default SearchJobTitle;
