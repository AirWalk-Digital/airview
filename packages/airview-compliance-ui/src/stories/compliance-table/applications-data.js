export const applicationsData = [
  {
    id: 1,
    qualityModel: "operational",
    severity: "medium",
    name: "Vivamus vestibulum ntulla nec ante",
    tickets: [
      {
        reference: "PRB12345678",
        type: "problem",
      },
    ],
    raisedDateTime: (function () {
      const now = new Date();
      now.setHours(now.getHours() - 1);
      return now.toISOString();
    })(),
    environment: "Production",
    applicationDetailData: {
      instances: [
        {
          id: 1,
          name: "Server Instance 1",
          status: "none",
        },
        {
          id: 2,
          name: "Server Instance 2",
          status: "none",
        },
        {
          id: 3,
          name: "Server Instance 3",
          status: "none",
        },
        {
          id: 4,
          name: "Server Instance 4",
          status: "none",
        },
        {
          id: 5,
          name: "Server Instance 5",
          status: "none",
        },
        {
          id: 6,
          name: "Server Instance 6",
          status: "none",
        },
        {
          id: 7,
          name: "Server Instance 7",
          status: "none",
        },
        {
          id: 8,
          name: "Server Instance 8",
          status: "none",
        },
        {
          id: 9,
          name: "Server Instance 9",
          status: "none",
        },
        {
          id: 10,
          name: "Server Instance 10",
          status: "none",
        },
        {
          id: 11,
          name: "Server Instance 11",
          status: "none",
        },
        {
          id: 12,
          name: "Server Instance 12",
          status: "none",
        },
        {
          id: 13,
          name: "Server Instance 13",
          status: "none",
        },
        {
          id: 14,
          name: "Server Instance 14",
          status: "none",
        },
        {
          id: 15,
          name: "Server Instance 15",
          status: "none",
        },
        {
          id: 16,
          name: "Server Instance 16",
          status: "none",
        },
      ],
      control: {
        name: "AWS ECS Pattern  CPU Monitoring",
        url: "/",
      },
      frameworks: [
        {
          name: "PCI-DSS",
          url: "/",
        },
        {
          name: "ISO27K",
          url: "/",
        },
        {
          name: "GPK",
          url: "/",
        },
      ],
      environment: "production",
      assignmentGroup: "Server Team",
      assignee: "James Brown",
      systemSource: "AWS/CCF",
      systemStage: "Monitor",
    },
  },
  {
    id: 2,
    qualityModel: "security",
    severity: "high",
    name: "Donec consectetuer ligula vulputate sem tristique cursus",
    tickets: [
      {
        reference: "INC12345678",
        type: "incident",
      },
    ],
    raisedDateTime: (function () {
      const now = new Date();
      now.setMinutes(now.getMinutes() - 10);
      return now.toISOString();
    })(),
    environment: "Production",
    applicationDetailData: {
      instances: [
        {
          id: 1,
          name: "Server Instance 1",
          status: "pending",
        },
      ],
      control: {
        name: "AWS ECS Pattern  CPU Monitoring",
        url: "/",
      },
      frameworks: [
        {
          name: "PCI-DSS",
          url: "/",
        },
        {
          name: "ISO27K",
          url: "/",
        },
        {
          name: "GPK",
          url: "/",
        },
      ],
      environment: "production",
      assignmentGroup: "Server Team",
      assignee: "James Brown",
      systemSource: "AWS/CCF",
      systemStage: "Monitor",
    },
  },
  {
    id: 3,
    qualityModel: "task",
    severity: "low",
    name: "Integer vitae libero ac risus egestas placerat",
    tickets: [
      {
        reference: "INC12345678-ABT",
        type: "incident",
      },
      {
        reference: "PRB12345678",
        type: "problem",
      },
      {
        reference:
          "RSK12345678QJDTANDKRSK12345678QJDTANDKRSK12345678QJDTANDKRS",
        type: "risk",
      },
    ],
    raisedDateTime: (function () {
      const now = new Date();
      now.setDate(now.getDate() - 1);
      return now.toISOString();
    })(),
    environment: "UAT",
    applicationDetailData: {
      instances: [
        {
          id: 1,
          name: "Server Instance 1",
          status: "pending",
        },
      ],
      control: {
        name: "AWS ECS Pattern  CPU Monitoring",
        url: "/",
      },
      frameworks: [
        {
          name: "PCI-DSS",
          url: "/",
        },
        {
          name: "ISO27K",
          url: "/",
        },
        {
          name: "GPK",
          url: "/",
        },
      ],
      environment: "production",
      assignmentGroup: "Server Team",
      assignee: "James Brown",
      systemSource: "AWS/CCF",
      systemStage: "Monitor",
    },
  },
  {
    id: 4,
    qualityModel: "task",
    severity: "low",
    name: "Vivamus id diam bibendum, rhoncus leo quis, consequat",
    tickets: [
      {
        reference: "INC12345678-ABT",
        type: "incident",
      },
    ],
    raisedDateTime: (function () {
      const now = new Date();
      now.setMonth(now.getMonth() - 1);
      return now.toISOString();
    })(),
    environment: "UAT",
    applicationDetailData: {
      instances: [
        {
          id: 1,
          name: "Server Instance 1",
          status: "pending",
        },
      ],
      control: {
        name: "AWS ECS Pattern CPU Monitoring",
        url: "/",
      },
      frameworks: [
        {
          name: "PCI-DSS",
          url: "/",
        },
        {
          name: "ISO27K",
          url: "/",
        },
        {
          name: "GPK",
          url: "/",
        },
      ],
      environment: "production",
      assignmentGroup: "Server Team",
      assignee: "James Brown",
      systemSource: "AWS/CCF",
      systemStage: "Monitor",
    },
  },
  {
    id: 5,
    qualityModel: "security",
    severity: "medium",
    name: "Phasellus fermentum tincidunt nisl",
    tickets: [
      {
        reference: "PRB12345678",
        type: "problem",
      },
    ],
    raisedDateTime: (function () {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      return now.toISOString();
    })(),
    environment: "UAT",
    applicationDetailData: {
      instances: [
        {
          id: 1,
          name: "Server Instance 1",
          status: "pending",
        },
      ],
      control: {
        name: "AWS ECS Pattern  CPU Monitoring",
        url: "/",
      },
      frameworks: [
        {
          name: "PCI-DSS",
          url: "/",
        },
        {
          name: "ISO27K",
          url: "/",
        },
        {
          name: "GPK",
          url: "/",
        },
      ],
      environment: "production",
      assignmentGroup: "Server Team",
      assignee: "James Brown",
      systemSource: "AWS/CCF",
      systemStage: "Monitor",
    },
  },
];
