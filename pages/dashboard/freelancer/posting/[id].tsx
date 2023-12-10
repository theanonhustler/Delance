import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";
import { useAccount, useWalletClient } from "wagmi";
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { getJobById } from "@/blockchain/utils";
import { useRouter } from "next/router";
import { send } from "@pushprotocol/restapi/src/lib/chat";

const ViewPosting = () => {
  const router = useRouter();
  const [posting, setPosting] = useState<any>(null);
  const [file, setFile] = useState<[]>([]);
  const [pushAuth, setPushAuth] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [uploadLink, setUploadLink] = useState("");
  const [dynamicLink, setDynamicLink] = useState("");
  const [oldChats, setOldChats] = useState<any>([]);
  const { address } = useAccount();
  const { id } = router.query;
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

  useEffect(() => {
    if (router.isReady){
      // @ts-ignore
      getJobById(id).then((data) => {
        setPosting(data);
      });
    }
  }, [posting,router.isReady]);

  const progressCallback = (progressData: any) => {
    let percentageDone =
      100 - Number((progressData?.total / progressData?.uploaded)?.toFixed(2));
    console.log(percentageDone);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files : null;
    // @ts-ignore
    setFile(selectedFile);
    // setUploadLink("");
    setDynamicLink("");
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected");
      return;
    }

    try {
      const env = process.env.NEXT_PUBLIC_LIGHTHOUSE_API!;
      // console.log(fil);
      const uploadFile = async () => {
        // @ts-ignore
        const output = await lighthouse.upload(
          file,
          env,
          false,
          null,
          () => {}
        );
        console.log("File Status:", output);
        setDynamicLink(
          "https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
        );
        // console.log(
        //   "Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash
        // );
      };
      uploadFile();
      alert(dynamicLink);
      // getApiKey();
    } catch (err) {
      alert(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { data: walletClient } = useWalletClient();

  const pushInit = async () => {
    if (walletClient && posting.clientId) {
      const userClient = await PushAPI.initialize(walletClient!, {
        env: CONSTANTS.ENV.STAGING,
      });
      setPushAuth(true);

      const streamClient = await userClient.initStream([
        CONSTANTS.STREAM.CHAT,
        CONSTANTS.STREAM.CHAT_OPS,
        CONSTANTS.STREAM.CONNECT,
      ]);

      let aliceConnected = false;
      streamClient.on(CONSTANTS.STREAM.CONNECT, () => {
        aliceConnected = true;
        console.log("Alice Stream Connected");

        // Call sendMessage which checks if both Alice and Bob are connected
        // amd sends a message from Alice to Bob
        sendMessage();
      });
      // userAlice.chat.list(type, {options?})
      const aliceChats = await userClient.chat.list("REQUESTS");
      console.log("Alice chats", aliceChats[0]);
      if (aliceChats.length != 0) {
        const bobAcceptAliceRequest = await userClient.chat.accept(
          aliceChats[0].wallets
        );
        console.log("Bob accepted Alice's chat request", bobAcceptAliceRequest);
      }
      streamClient.on(CONSTANTS.STREAM.CHAT, (chat) => {
        if (chat.origin === "other") {
          // means chat that is coming is sent by other (not self as stream emits both your and other's messages)
          console.log("Alice received chat message", chat);
        }
      });
      // userAlice.chat.history(recipient. {options?})
      const aliceChatHistoryWithBob = await userClient.chat.history(
        posting.clientId
      );
      console.log(aliceChatHistoryWithBob);
      setOldChats(aliceChatHistoryWithBob);

      const sendMessage = async () => {
        if (aliceConnected) {
          console.log(
            "Sending message from Alice to Bob as we know Alice and Bob stream are both connected and can respond"
          );
          console.log("Wait few moments to get messages streaming in");
          await userClient.chat.send(posting.clientId, {
            content: "hey",
          });
        }
      };

      streamClient.on(CONSTANTS.STREAM.CHAT_OPS, (chatops) => {
        console.log("Alice received chat ops", chatops);
        oldChats.push(chatops);
      });
      await streamClient.connect();
    }
  };

  return (
    <main className="min-h-screen bg-[url('/assets/line-bg.png')] w-full font-outfit bg-app-grey-dark text-stone-200">
      <section className="p-4 flex flex-col md:flex-row md:px-16 items-center gap-12 w-full mx-auto py-[50px] md:py-[80px]">
        <div className="md:w-2/3 w-full">
          <h1 className="text-3xl lg:text-5xl font-bold">{posting?.title}</h1>
          <p className="text-slate-200 text-lg font-medium md:text-xl mt-4">
            $8000 USD • 2 days ago
          </p>
          <div className="py-8">
            <p className="text-lg font-medium">Assigned by:</p>
            <div className="p-4 border-2 bg-app-grey-light border-app-grey-light rounded-md mt-2 max-w-md">
              <div className="flex justify-between items-center gap-4">
                <span className="text-base font-medium">Client 1</span>
                <span className="text-amber-500">Not Submitted</span>
                {/* <span className="text-green-500">Accepted</span> */}
                {/* <span className="text-red-500">Rejected</span> */}
              </div>
            </div>
          </div>
          {/* <div className="p-4 border-2 border-app-grey-light bg-app-grey-light rounded-md max-w-md">
            <p className="text-base font-medium">Update the Progress</p>
            <div className="mt-4 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-base">Sub Task 1</span>
                <Button variant={"outline"} className="h-10" disabled>
                  Completed
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Sub Task 2</span>
                <Button variant={"outline"} className="h-10">
                  Complete
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-base">Sub Task 3</span>
                <Button variant={"outline"} className="h-10">
                  Complete
                </Button>
              </div>
            </div>
          </div> */}
          <div className="p-4 border-2 border-app-grey-light bg-app-grey-light rounded-md mt-4 max-w-md">
            <p className="text-md">Submit Files</p>
            {/* <Button variant={"outline"} className="h-10 mt-4">
              Upload
            </Button> */}
            {/* <div>
              <div className="p-2 border-2 border-stone-500 rounded-md mt-2 underline">
                1.File one
              </div>
              <div className="p-2 border-2 border-stone-500 rounded-md mt-2 underline">
                1.File one
              </div>
              <div className="p-2 border-2 border-stone-500 rounded-md mt-2 underline">
                1.File one
              </div>
            </div> */}
            {isLoading ? (
              <>Uploading...</>
            ) : (
              <>
                <div className="mt-2">
                  <div className="w-full">
                    <Button
                      variant={"outline"}
                      className="w-full"
                      onClick={handleSelectFile}
                    >
                      Select File to Upload
                      <input
                        id="file"
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="w-full h-full"
                        style={{ display: "none" }}
                      />
                    </Button>
                    <div className="flex-1 flex items-center pl-4x text-sm ">
                      {file.length != 0
                        ? // @ts-ignore
                          "File Name:" + " " + Array.from(file)[0].name
                        : "No file selected"}
                    </div>
                  </div>
                  <div className="flex flex-col mt-4">
                    <Button
                      className="button-con button-53 h-12"
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className=" h-[600px] md:w-3/4 w-full ">
          <div className="flex flex-col flex-grow w-full h-full bg-app-grey-light shadow-xl rounded-lg overflow-hidden">
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
                  onClick={pushInit}
                  variant={"outline"}
                  className="h-10 mt-4"
                >
                  Send
                </Button>
              </>
            ) : (
              <div className="flex justify-center items-center">
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
      </section>
    </main>
  );
};

export default ViewPosting;
