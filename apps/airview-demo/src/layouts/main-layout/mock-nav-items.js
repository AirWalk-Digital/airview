export const mockNavItems = [
  {
    application: "Microsoft Teams",
    menuItems: [
      {
        groupTitle: "Application",
        links: [
          {
            label: "Overview",
            url: "/application/ms_teams",
          },
        ],
      },
      {
        groupTitle: "Knowledge",
        links: [
          {
            label: "View all",
            url: "/application/ms_teams/knowledge",
          },
          {
            label: "Place Call on Hold",
            url: "/knowledge/place_call_on_hold",
          },
          {
            label: "Composing a new message",
            url: "/knowledge/composing_a_new_message",
          },
        ],
      },
      {
        groupTitle: "Release",
        links: [
          {
            label: "View all",
            url: "/application/ms_teams/release",
          },
          {
            label: "Security Patch",
            url: "/release/security_patch",
          },
        ],
      },
    ],
  },
  {
    application: "Microsoft Outlook",
    menuItems: [
      {
        groupTitle: "Application",
        links: [
          {
            label: "Overview",
            url: "/application/ms_outlook",
          },
        ],
      },
      {
        groupTitle: "Knowledge",
        links: [
          {
            label: "View all",
            url: "/application/ms_outlook/knowledge",
          },
          {
            label: "Setup your mailbox",
            url: "/knowledge/setup_your_mailbox",
          },
          {
            label: "Schedule the delivery of an email",
            url: "/knowledge/schedule_send_an_email",
          },
        ],
      },
    ],
  },
];
