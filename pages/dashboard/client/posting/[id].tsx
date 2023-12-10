import {
  completeJob,
  deleteJob,
  getFreelancerInfo,
  getJobById,
} from "@/blockchain/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { timeConverter } from "@/lib/utils";
import { utils } from "ethers";
import TimeAgo from "javascript-time-ago";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ViewFreelancerProfileDialog from "@/components/clientDashboard/ViewFreelancerProfileDialog";
import toast from "react-hot-toast";
import { useWalletClient } from "wagmi";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";

function ViewPosting() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const [post, setPost] = useState();
  const { id } = router.query;
  const [freelancerRequest, setFreelancerRequest] = useState();
  const [freelanceAssigned, setFreelanceAssigned] = useState();
  const [pushAuth, setPushAuth] = useState(false);
  const [chatMessage, setChatMessage] = useState();
  const [oldChats, setOldChats] = useState<any>([]);
  const [userClientState,setUserClientState] = useState<any>(null);
  const [clientStatus,setClientStatus] = useState(false);

  useEffect(() => {
    if (isConnected && router.isReady) {
      // @ts-ignore
      getJobById(id).then((data) => {
        /* @ts-ignore */
        setPost(data as Posting[]);
      });
    }
  }, [address, router.isReady]);

  const [values, setValues] = useState({
    msg: "",
  });

  const handleValuesChange =
    (key: keyof typeof values) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => {
        return { ...prev, [key]: e.target.value };
      });
    };

  const { data: walletClient } = useWalletClient();

  const pushInit = async () => {
    if (walletClient && CONSTANTS) {
      const userClient = await PushAPI.initialize(walletClient!, {
        env: CONSTANTS.ENV.STAGING,
      });
      setPushAuth(true);
      setUserClientState(userClient);

      const streamClient = await userClient.initStream([
        CONSTANTS.STREAM.CHAT,
        CONSTANTS.STREAM.CHAT_OPS,
        CONSTANTS.STREAM.CONNECT,
      ]);

      let aliceConnected = false;
      streamClient.on(CONSTANTS.STREAM.CONNECT, () => {
        setClientStatus(true);
        console.log("Alice Stream Connected");

        sendMessage();
      });
      const aliceChatHistoryWithBob = await userClient.chat.history(
        // @ts-ignore
        post?.freelancerId
      );
      console.log(aliceChatHistoryWithBob);
      setOldChats(aliceChatHistoryWithBob);

      streamClient.on(CONSTANTS.STREAM.CHAT, (chat) => {
        if (chat.origin === "other") {
          // means chat that is coming is sent by other (not self as stream emits both your and other's messages)
          console.log("Alice received chat message", chat);
        }
      });

      
      streamClient.on(CONSTANTS.STREAM.CHAT_OPS, (chatops) => {
        console.log("Alice received chat ops", chatops);
        oldChats.push(chatops);
      });
      await streamClient.connect();
    }
  };

  const sendMessage = async () => {
      console.log(post)
      if (clientStatus && post ) {
        console.log(
          "Sending message from Alice to Bob as we know Alice and Bob stream are both connected and can respond"
        );
        console.log("Wait few moments to get messages streaming in");
        // await userClientState?.chat.send(
        //   // @ts-ignore
        //   post?.freelancerId,
        //   {
        //     content: values.msg,
        //   }
        // );
      }
  };
  
  const timeAgo = new TimeAgo("en-US");

  const assigned =
    // @ts-ignore
    post?.freelancerId !== "0x0000000000000000000000000000000000000000";

  const getFreelancerRequestData = () => {
    if (!post && assigned) return;
    // @ts-ignore
    let freelancerData = [];
    // @ts-ignore
    post?.freelancerRequests.forEach((walletAddress) => {
      const data = getFreelancerInfo(walletAddress);
      freelancerData.push(data);
    });
    // @ts-ignore
    Promise.all(freelancerData).then((data) => {
      // @ts-ignore
      setFreelancerRequest(data);
    });
  };
  useEffect(() => {
    getFreelancerRequestData();
  }, [assigned, post]);

  useEffect(() => {
    if (post && assigned) {
      // @ts-ignore
      getFreelancerInfo(post?.freelancerId).then((data) => {
        // @ts-ignore
        setFreelanceAssigned(data);
      });
    }
  }, [assigned, post]);

  const handleCompleteJob = () => {
    toast.loading(<b>Approving Work</b>, {
      id: "approveWork",
    });
    // @ts-ignore
    completeJob(id!)
      .then(() => {
        toast.success(<b>Work Approved and Task Done</b>, {
          id: "approveWork",
        });
      })
      .catch((err) => {
        toast.error(<b>Approving Work Error</b>, {
          id: "approveWork",
        });
      });
  };

  const handleRejectJob = () => {
    toast.loading(<b>Rejecting Work</b>, {
      id: "rejectWork",
    });
    // @ts-ignore
    deleteJob(id!)
      .then(() => {
        toast.success(<b>Work Rejected and Deleted</b>, {
          id: "rejectWork",
        });
      })
      .catch(() => {
        toast.error(<b>Rejecting Work Deleted</b>, {
          id: "rejectWork",
        });
      });
  };

  return (
    <main className="min-h-screen bg-[url('/assets/line-bg.png')] w-full font-outfit bg-app-grey-dark text-stone-200">
      <section className="p-4  md:px-16 items-center gap-12 w-full mx-auto py-[50px] md:py-[80px]">
        <div className="grid w-full grid-cols-1 md:grid-cols-2">
          {/* @ts-ignore */}

          <h1 className="text-3xl font-bold lg:text-5xl">{post?.title}</h1>
          <p className="mt-4 text-lg font-medium text-slate-200 md:text-xl">
            {/* @ts-ignore */}
            {post && utils.formatEther(post?.payInCELO)} CELO •{" "}
            {/* @ts-ignore */}
            {post && timeAgo.format(new Date(timeConverter(post?.createdAt)))}
          </p>

          {assigned ? (
            <>
              <div className="py-8">
                <p className="text-lg font-medium">Assigned To:</p>
                <div className="max-w-lg p-4 mt-2 border-2 rounded-md bg-app-grey-light border-app-grey-light">
                  <div className="flex items-center gap-4 ">
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
                      <h1 className="text-base font-semibold">
                        {/* @ts-ignore */}
                        {freelanceAssigned?.name}
                      </h1>
                      <div className="flex gap-4 text-base font-medium">
                        {/* @ts-ignore */}
                        <p>{freelanceAssigned?.skills}</p>
                        <p>|</p>
                        {/* @ts-ignore */}
                        <p>{freelanceAssigned?.category}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-w-lg p-4 mt-4 border-2 rounded-md border-app-grey-light bg-app-grey-light">
                  <p className="text-md">View Files</p>
                  <div>
                    <div className="p-2 mt-2 underline border-2 rounded-md border-stone-500">
                      1.File one
                    </div>
                    <div className="p-2 mt-2 underline border-2 rounded-md border-stone-500">
                      1.File one
                    </div>
                    <div className="p-2 mt-2 underline border-2 rounded-md border-stone-500">
                      1.File one
                    </div>
                  </div>
                </div>
                <div className="flex max-w-lg gap-2 mt-4 ">
                  <Button
                    onClick={handleCompleteJob}
                    variant={"outline"}
                    className="w-full h-12 text-base"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={handleRejectJob}
                    variant={"outline"}
                    className="w-full h-12 text-base"
                  >
                    Decline
                  </Button>
                </div>
              </div>
              {/* @ts-ignore */}
              {post && post?.completed ? (
                <p className="flex flex-col items-center justify-center w-full p-4 text-xl font-bold text-center text-green-500 rounded-md animate-pulse h-96 bg-green-800/20">
                  This Project Has been completed
                </p>
              ) : (
                <>
                  {/* <div className="max-w-lg p-4 border-2 rounded-md border-app-grey-light bg-app-grey-light">
                    <p className="text-md">Progress</p>
                    <div className="mt-4">
                      <div className="overflow-hidden bg-gray-200 rounded-full">
                        <div className="w-1/2 h-2 rounded-full bg-app-slate-blue"></div>
                      </div>
                      <ol className="grid grid-cols-3 mt-4 text-sm font-medium text-gray-500">
                        <li className="flex items-center justify-start text-app-slate-blue/70 sm:gap-1.5">
                          <span className="hidden sm:inline"> Sub Task 1 </span>
                          <CheckCircle className="w-5 h-5" />
                        </li>

                        <li className="flex items-center justify-center text-app-slate-blue/70 sm:gap-1.5">
                          <span className="hidden sm:inline"> Sub Task 2 </span>
                          <CheckCircle className="w-5 h-5" />
                        </li>
                        <li className="flex items-center justify-end sm:gap-1.5">
                          <span className="hidden sm:inline"> Sub Task 3 </span>
                          <CheckCircle className="w-5 h-5" />
                        </li>
                      </ol>
                    </div>
                  </div> */}
                </>
              )}

              <div className=" h-[600px] md:w-3/4 w-full ">
                <div className="flex flex-col flex-grow w-full h-full overflow-hidden rounded-lg shadow-xl bg-app-grey-light">
                  {pushAuth ? (
              <>
                <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                  {oldChats.map((chat: any) => (
                    <div key={chat.id}>
                      {!chat.fromDID.includes(address) ? (
                        <div className="flex w-full mt-2 space-x-3 max-w-xs">
                          <div className="p-3 bg-gray-600/50 rounded-r-lg rounded-bl-lg">
                            <p className="text-sm">{chat.messageContent}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end ">
                          <div className="bg-app-slate-blue text-white p-3 rounded-l-lg rounded-br-lg">
                            <p className="text-sm">{chat.messageContent}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="bg-gray-500/50 p-4">
                  <Input
                    onChange={handleValuesChange("msg")}
                    className="w-full"
                    placeholder="Type a message"
                  />
                </div>
                <Button
                  onClick={()=>sendMessage()}
                  variant={"outline"}
                  className="h-10 mt-4"
                >
                  Send
                </Button>
              </>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Button
                        onClick={pushInit}
                        variant={"outline"}
                        className="h-10 mt-4"
                      >
                        Authenticated your wallet to chat
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-4 my-4 md:grid-cols-2 ">
              {/* @ts-ignore */}
              {freelancerRequest && freelancerRequest.length > 0 ? (
                // @ts-ignore
                freelancerRequest.map((freelancer, index) => {
                  // @ts-ignore
                  return (
                    <FreelancerCard
                      key={index}
                      freelancer={freelancer}
                      name={freelancer.name}
                    />
                  );
                })
              ) : (
                <p>No Request from the Freelancers</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default ViewPosting;

interface FreelancerCardProps {
  name: string;
  freelancer: any;
}
const FreelancerCard = ({ name, freelancer }: FreelancerCardProps) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="flex flex-col w-full gap-8 p-4 transition-all duration-300 border rounded lg:flex-ro md:justify-between md:items-center hover:-translate-y-1 bg-app-grey-light md:p-8 border-white/10">
      <div className="flex items-center gap-4">
        <div>
          <Image
            unoptimized
            className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
            src="https://picsum.photos/200"
            alt="company logo"
            width={100}
            height={100}
          />
        </div>
        <div className="">
          <h1 className="text-base font-semibold">{name}</h1>
          <div className="flex gap-4 text-base font-medium">
            <p>
              Is interested to work on your job posting &quot;Job Posting&quot;
            </p>
          </div>
        </div>
      </div>
      <ViewFreelancerProfileDialog
        category={freelancer.category}
        experience={freelancer.experience}
        name={name}
        skills={freelancer.skills}
        walletAddress={freelancer.walletAddress}
        jobID={Number(id)}
      />
    </div>
  );
};
