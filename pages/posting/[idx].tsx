import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

import { Banknote, BarChart, Briefcase, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { getJobById, requestForJob } from "@/blockchain/utils";
import { utils } from "ethers";
import { timeConverter } from "@/lib/utils";
import toast from "react-hot-toast";

const IndividualPostingPage = () => {
  const benefits = [
    "Flexible work schedule and remote work options.",
    "Opportunity to work with a talented and diverse team.",
    "Enhance your project management skills and gain valuable experience in software development.",
    "Competitive pay and potential for long-term collaboration.",
    "Contribute to the successful delivery of a cutting-edge software product.",
  ];
  const responsibilities = [
    "Develop and maintain a detailed project plan, including tasks, timelines, and dependencies.",
    "Allocate resources and manage project budget to ensure efficient utilization of available resources.",
    "Coordinate and communicate with cross-functional teams to ensure alignment and timely completion of project milestones.",
  ];
  const [post, setPost] = useState([]);

  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { idx } = router.query;

  const sendPostingRequestNotification = async () => {
    toast.loading(<b>Sending Request to the client</b>, {
      id: "requestJob",
    });
    requestForJob(Number(idx))
      .then((hash) => {
        toast.success(<b>Request Sent Successfully in hash {hash}</b>, {
          id: "requestJob",
        });
      })
      .catch((err) => {
        toast.error(<b>Request Sending Error</b>, {
          id: "requestJob",
        });
      });
  };

  useEffect(() => {
    if (!isConnected) {
      router.replace("/");
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && idx) {
      getJobById(Number(idx)).then((data) => {
        /* @ts-ignore */
        setPost(data as Posting[]);
      });
    }
  }, [address, idx]);

  return (
    <>
      <Head>
        {/* @ts-ignore */}
        <title>{post.title} | Delance</title>
      </Head>
      <main className="h-full bg-[url('/assets/line-bg.png')] w-full font-outfit bg-app-grey-dark text-stone-200">
        <Header />
        <section className="p-4 flex md:px-16 items-center gap-6 max-w-7xl mx-auto py-[50px] md:py-[80px]">
          {/* <div>
            <Image
              unoptimized
              className="w-20"
              src={post.client.image}
              alt={post.client.name}
              width={100}
              height={100}
            />
          </div> */}
          <div>
            {/* @ts-ignore */}
            <h1 className="text-3xl font-bold lg:text-5xl">
              {/* @ts-ignore */}
              {post.title}
            </h1>
            {/* <p className="mt-2 text-lg font-medium text-slate-200 md:text-xl">
              {post.client.name}
            </p> */}
          </div>
        </section>
        <section className="p-4 flex flex-col md:px-16 lg:flex-row gap-6 max-w-7xl mx-auto pb-[50px] md:pb-[80px]">
          <div>
            <h2 className="text-2xl font-bold lg:text-4xl">Job Description</h2>
            <p className="mt-2 text-slate-200 md:text-lg">
              {/* @ts-ignore */}
              {post?.description}{" "}
            </p>
            {/* <p className="mt-2 text-slate-200 md:text-lg">
              We are seeking a skilled freelance project manager to oversee a
              software development project in Austin, TX. As the project
              manager, you will be responsible for ensuring the successful
              completion of the project within the given budget and timeline.
              Your strong project planning, budgeting, and team coordination
              skills will be crucial in driving the project forward.
            </p>
            <p className="mt-2 text-slate-200 md:text-lg">
              In this role, you will collaborate with cross-functional teams,
              including developers, designers, and stakeholders, to define
              project goals, allocate resources, and track progress. You will
              also be responsible for identifying and mitigating risks,
              resolving conflicts, and ensuring effective communication among
              team members.
            </p> */}
            <h2 className="my-4 text-2xl font-bold lg:text-4xl">
              Key Responsibilities
            </h2>
            <ul className="list-disc">
              {benefits.map((benefits, idx) => (
                <li key={idx} className="mt-2 ml-4 text-slate-200 md:text-lg">
                  {benefits}
                </li>
              ))}
            </ul>
            <ul className="list-disc">
              {responsibilities.map((responsibilities, idx) => (
                <li key={idx} className="mt-2 ml-4 text-slate-200 md:text-lg">
                  {responsibilities}
                </li>
              ))}
            </ul>
            <h2 className="mt-4 text-2xl font-bold lg:text-4xl">Benefits</h2>
            <ul className="list-disc">
              {benefits.map((benefits, idx) => (
                <li key={idx} className="mt-2 ml-4 text-slate-200 md:text-lg">
                  {benefits}
                </li>
              ))}
            </ul>
          </div>
          <div className="">
            <div className="w-full h-fit bg-app-grey-light border border-white/20 rounded p-4 md:min-w-[400px] lg:sticky top-24">
              <h2 className="text-2xl font-bold lg:text-4xl">Overview</h2>
              <ul className="flex flex-col gap-4 mt-4">
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <Calendar strokeWidth={1.5} size={20} />
                    Posted on:
                  </span>
                  {/* @ts-ignore */}
                  <span>{timeConverter(post.createdAt)}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <MapPin strokeWidth={1.5} size={20} />
                    Location:
                  </span>
                  {/* @ts-ignore */}
                  <span>{post.location === "" ? "Remote" : post.location}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <BarChart strokeWidth={1.5} size={20} />
                    Level:
                  </span>
                  {/* @ts-ignore */}
                  <span>{post?.experience}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <Briefcase strokeWidth={1.5} size={20} />
                    Category:
                  </span>
                  {/* @ts-ignore */}
                  <span>{post.category && post.category}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-medium">
                    <Banknote strokeWidth={1.5} size={20} />
                    Pay:
                  </span>
                  <span>
                    {/* @ts-ignore */}
                    {post.payInCELO && utils?.formatEther(post.payInCELO)} CELO
                  </span>
                </li>
              </ul>
              <Button
                variant={"outline"}
                className="w-full h-12 mt-4 text-base"
                onClick={sendPostingRequestNotification}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default IndividualPostingPage;
