export const contractAddress: string =
  "0x753f7e810aA74eB8dA9d6D3649e2F0F46d7d03F7";

export const ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "freelancerToAccept",
        type: "address",
      },
    ],
    name: "acceptJobRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "yourName",
        type: "string",
      },
      {
        internalType: "string",
        name: "CompanyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "addOrUpdateClientData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "string",
        name: "experience",
        type: "string",
      },
      {
        internalType: "string",
        name: "skills",
        type: "string",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "addOrUpdateFreelancerData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "freelancerId",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CEL0Transferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "completeJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "clientId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "freelancerId",
        type: "address",
      },
    ],
    name: "JobAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "clientId",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "freelancerId",
        type: "address",
      },
    ],
    name: "JobCompleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "clientId",
        type: "address",
      },
    ],
    name: "JobPosted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "freelancerId",
        type: "address",
      },
    ],
    name: "JobRequested",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "markClientDataAsDeleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "markFreelancerDataAsDeleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "payInCELO",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "experience",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
    ],
    name: "postJob",
    outputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "requestJob",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "clients",
    outputs: [
      {
        internalType: "string",
        name: "yourName",
        type: "string",
      },
      {
        internalType: "string",
        name: "CompanyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
      {
        internalType: "bool",
        name: "deleted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "freelancers",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "string",
        name: "experience",
        type: "string",
      },
      {
        internalType: "string",
        name: "skills",
        type: "string",
      },
      {
        internalType: "bool",
        name: "deleted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllJobs",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "clientId",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "payInCELO",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "experience",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "freelancerRequests",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "freelancerId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "completed",
            type: "bool",
          },
        ],
        internalType: "struct UsersContract.Job[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "getClientData",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "yourName",
            type: "string",
          },
          {
            internalType: "string",
            name: "CompanyName",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "address",
            name: "walletAddress",
            type: "address",
          },
          {
            internalType: "bool",
            name: "deleted",
            type: "bool",
          },
        ],
        internalType: "struct UsersContract.Client",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "getFreelancerData",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "address",
            name: "walletAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "experience",
            type: "string",
          },
          {
            internalType: "string",
            name: "skills",
            type: "string",
          },
          {
            internalType: "bool",
            name: "deleted",
            type: "bool",
          },
        ],
        internalType: "struct UsersContract.Freelancer",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
    ],
    name: "getJobById",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "clientId",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "location",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "payInCELO",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "experience",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address[]",
            name: "freelancerRequests",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "freelancerId",
            type: "address",
          },
          {
            internalType: "bool",
            name: "completed",
            type: "bool",
          },
        ],
        internalType: "struct UsersContract.Job",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "jobCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "jobs",
    outputs: [
      {
        internalType: "address",
        name: "clientId",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "location",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "payInCELO",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "experience",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "freelancerId",
        type: "address",
      },
      {
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "walletAddress",
        type: "address",
      },
    ],
    name: "userExists",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];