import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAccount } from "wagmi";
import { addClientData, addFreelancerData } from "@/blockchain/utils";
import toast from "react-hot-toast";

function UserType() {
  const router = useRouter();
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [freelancerData, setFreelancerData] = useState({
    name: "",
    email: "",
    category: "",
    experience: "",
    skills: "",
  });

  const handleClientValuesChange =
    (key: keyof typeof clientData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setClientData((prev) => {
        return { ...prev, [key]: e.target.value };
      });
    };
  const handleFreelancerValuesChange =
    (key: keyof typeof freelancerData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFreelancerData((prev) => {
        return { ...prev, [key]: e.target.value };
      });
    };
  const handleFreelancerCategorySelect = (val: string) => {
    setFreelancerData((prev) => {
      return { ...prev, category: val };
    });
  };
  const handleExperienceSelect = (val: string) => {
    setFreelancerData((prev) => {
      return { ...prev, experience: val };
    });
  };

  const handleClientSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(clientData);
    addClientToChain();
  };
  const handleFreelancerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(freelancerData);
    addFreelancerToChain();
  };

  const CATEGORIES = [
    "Accounting",
    "Business & Consulting",
    "Human Research",
    "Marketing & Finance",
    "Design & Development",
    "Finance Managment",
    "Project Management",
    "Customer Service",
    "Others",
  ];
  const BUDGET = [
    "0-5000",
    "5000-10000",
    "10000-50000",
    "50000-100000",
    "100000+",
  ];

  const EXPERIENCE = ["Beginner", "Intermediate", "Expert"];

  const { isConnected, address } = useAccount();

  const addClientToChain = () => {
    toast.loading(<b>Adding Client Data to Blockchain</b>, {
      id: "clientToast",
    });
    if (isConnected) {
      addClientData(
        clientData.name,
        clientData.email,
        clientData.company,
        clientData.description,
        address!
      )
        .then(() => {
          toast.success(
            <b>Added {clientData.name}&apos;s Data to Blockchain</b>,
            {
              id: "clientToast",
            }
          );
          router.replace("/dashboard/client");
        })
        .catch((err) => {
          toast.error(
            <b>Error Adding {clientData.name}&apos;s Data to Blockchain</b>,
            {
              id: "clientToast",
            }
          );
        });
    }
  };

  const addFreelancerToChain = () => {
    toast.loading(<b>Adding Freelancer Data to Blockchain</b>, {
      id: "freelancerToast",
    });
    if (isConnected) {
      addFreelancerData(
        freelancerData.name,
        freelancerData.email,
        freelancerData.category,
        freelancerData.experience,
        freelancerData.skills,
        address!
      )
        .then(() => {
          toast.success(
            <b>Added {freelancerData.name}&apos;s Data to Blockchain</b>,
            {
              id: "freelancerToast",
            }
          );
          router.replace("/find-a-job");
        })
        .catch((err) => {
          toast.error(
            <b>Error Adding {freelancerData.name}&apos;s Data to Blockchain</b>,
            {
              id: "freelancerToast",
            }
          );
        });
    }
  };

  return (
    <main className="min-h-screen bg-[url('/assets/line-bg.png')] w-full font-outfit bg-app-grey-dark text-stone-200">
      <section className="p-4 md:px-16 lg:max-w-4xl lg:mx-auto font-outfit py-[50px] md:py-[80px]">
        {router.query.userType === "client" ? (
          <>
            <div className="mx-auto flex flex-col gap-4 text-center pb-[50px] md:pb-[80px]">
              <h2 className="text-3xl font-bold lg:text-5xl">Join as Client</h2>
              <p className="text-slate-200 md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vel maximus justo, a accumsan neque. Donec magna diam,
                vestibulum a posuere vitae, lobortis in ipsum.
              </p>
            </div>
            <form
              onSubmit={handleClientSubmit}
              className="flex flex-col w-full gap-6 p-4 border rounded font-outfit bg-app-grey-light border-white/10"
            >
              <h1 className="text-xl font-bold md:text-2xl">Client Details</h1>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={handleClientValuesChange("name")}
                  required
                  type="text"
                  className="h-12"
                  placeholder="Enter your name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={handleClientValuesChange("email")}
                  required
                  type="email"
                  className="h-12"
                  placeholder="Enter your email  or Comapny email "
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="company">Comapny Name</Label>
                <Input
                  onChange={handleClientValuesChange("company")}
                  type="text"
                  className="h-12"
                  placeholder="Leave it blank if an individual"
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Company Description</Label>
                <Textarea
                  required
                  onChange={handleClientValuesChange("description")}
                  placeholder="Type your job description"
                  id="message"
                />
              </div>
              <Button
                onClick={() => handleClientSubmit}
                type="submit"
                className="h-12"
              >
                Join
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="mx-auto flex flex-col gap-4 text-center pb-[50px] md:pb-[80px]">
              <h2 className="text-3xl font-bold lg:text-5xl">
                Join as Freelancer
              </h2>
              <p className="text-slate-200 md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                vel maximus justo, a accumsan neque. Donec magna diam,
                vestibulum a posuere vitae, lobortis in ipsum.
              </p>
            </div>
            <form
              onSubmit={handleFreelancerSubmit}
              className="flex flex-col w-full gap-6 p-4 border rounded font-outfit bg-app-grey-light border-white/10"
            >
              <h1 className="text-xl font-bold md:text-2xl">
                Freelancer Details
              </h1>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  onChange={handleFreelancerValuesChange("name")}
                  required
                  type="text"
                  className="h-12"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  onChange={handleFreelancerValuesChange("email")}
                  required
                  type="email"
                  className="h-12"
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="category" className="mb-2">
                  Which category suits you best?
                </Label>
                <Select required onValueChange={handleFreelancerCategorySelect}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Pick a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="experience" className="mb-2">
                  What is your experience level as freelancer?
                </Label>
                <Select required onValueChange={handleExperienceSelect}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Pick your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPERIENCE.map((item, idx) => (
                      <SelectItem key={idx} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="skills">Your Skills</Label>
                <Textarea
                  required
                  onChange={handleFreelancerValuesChange("skills")}
                  placeholder="Type your skills seperated by comma"
                  id="skills"
                />
              </div>
              <Button
                onClick={() => handleFreelancerSubmit}
                type="submit"
                className="h-12"
              >
                Join
              </Button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}

export default UserType;
