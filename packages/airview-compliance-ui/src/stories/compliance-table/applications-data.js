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
