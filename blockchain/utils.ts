import { readContract, writeContract } from "@wagmi/core";
import { contractAddress, ABI } from "./contact";

import { utils } from "ethers";

const checkUserExists = async (walletAddress: string) => {
  const data = await readContract({
    address: contractAddress,
    abi: ABI,
    functionName: "userExists",
    args: [walletAddress],
  });

  console.log(data);
  return data;
};

const addClientData = async (
  yourName: string,
  companyName: string,
  description: string,
  email: string,
  walletAddress: string
) => {
  const { hash } = await writeContract({
    address: contractAddress,
    abi: ABI,
    functionName: "addOrUpdateClientData",
    args: [yourName, companyName, description, email, walletAddress],
  });

  console.log(hash);
  return hash;
};

const addFreelancerData = async (
  name: string,
  email: string,
  category: string,
  skills: string,
  experience: string,
  walletAddress: string
) => {
  const { hash } = await writeContract({
    address: contractAddress,
    abi: ABI,
    functionName: "addOrUpdateFreelancerData",
    args: [name, email, category, experience, skills, walletAddress],
  });

  console.log(hash);
  return hash;
};

const postJob = async (
  title: string,
  location: string,
  category: string,
  payInMATIC: number,
  experience: string,
  description: string
) => {
  try {
    const { hash } = await writeContract({
      address: contractAddress,
      abi: ABI,
      functionName: "postJob",
      args: [
        title,
        location,
        category,
        utils.parseEther(payInMATIC.toString()),
        experience,
        description,
      ],

      value: utils.parseEther(payInMATIC.toString()) as unknown as bigint,
    });
    return hash;
  } catch (err) {
    console.log(err);
  }
};

const getAllPostData = async () => {
  const data = await readContract({
    address: contractAddress,
    abi: ABI,
    functionName: "getAllJobs",
    args: [],
  });

  console.log(data);
  return data;
};

const getJobById = async (id: number) => {
  const data = await readContract({
    address: contractAddress,
    abi: ABI,
    functionName: "getJobById",
    args: [id],
  });

  console.log(data);
  return data;
};

export {
  checkUserExists,
  addClientData,
  addFreelancerData,
  postJob,
  getAllPostData,
  getJobById,
};
