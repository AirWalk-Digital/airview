export const applicationsData = [
  {
    id: 1,
    controlID: "A&A-01",
    controlTitle: "Audit and Assurance Policy and Procedures",
    owner: "APP",
    type: "Documentation",
    applicationDetailData: {
      detail: "Conduct audit according to the policy and procedures",
      controlMappings: [
        {
          name: "ISO27K",
          gap: "partial",
        },
        {
          name: "NIST",
          gap: "no",
        },
        {
          name: "CIS",
          gap: "full",
        },
        {
          name: "PCI",
          gap: "full",
        },
      ],
      Frequency: "12 Months",
    },
  },
  {
    id: 2,
    controlID: "A&A-02",
    controlTitle: "Independent Assessments",
    owner: "APP",
    type: "Manual",
    applicationDetailData: {
      detail:
        "Conduct independent audit and assurance assessments according to relevant standards at least annually",
      controlMappings: [
        {
          name: "ISO27K",
          gap: "partial",
        },
        {
          name: "NIST",
          gap: "no",
        },
        {
          name: "CIS",
          gap: "full",
        },
        {
          name: "PCI",
          gap: "full",
        },
      ],
      Frequency: "12 Months",
    },
  },
  {
    id: 3,
    controlID: "A&A-03",
    controlTitle: "Risk Based Planning Assessment",
    owner: "APP",
    type: "Manual",
    applicationDetailData: {
      detail: "Conduct risk assessment",
      controlMappings: [
        {
          name: "ISO27K",
          gap: "partial",
        },
        {
          name: "NIST",
          gap: "no",
        },
        {
          name: "CIS",
          gap: "full",
        },
        {
          name: "PCI",
          gap: "full",
        },
      ],
      Frequency: "12 Months",
    },
  },
];
