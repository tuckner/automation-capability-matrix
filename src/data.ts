import acm from './assets/acm.json'

const data = JSON.parse(JSON.stringify(acm));

const alertHandling = data.capabilities.filter((item: { category: string }) => item.category === "Alert Handling")
alertHandling.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});
const issueTracking = data.capabilities.filter((item: { category: string }) => item.category === "Issue Tracking")
issueTracking.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});
const enrichment = data.capabilities.filter((item: { category: string }) => item.category === "Enrichment")
enrichment.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});
const userInteraction = data.capabilities.filter((item: { category: string }) => item.category === "User Interaction")
userInteraction.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});
const response = data.capabilities.filter((item: { category: string }) => item.category === "Response")
response.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});
const continuity = data.capabilities.filter((item: { category: string }) => item.category === "Continuity")
continuity.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});
const procedural = data.capabilities.filter((item: { category: string }) => item.category === "Procedural")
procedural.forEach((element: { subtasks: any[] }) => {
  element.subtasks = [];
});

const schema = [
  {
    id:"0",
    name: "SOC Automation Capability Matrix",
    columns: [
      {id:"0",
        name: "Alert Handling",
        tasks: alertHandling
      },
      {id:"1",
        name: "Issue Tracking",
        tasks: issueTracking,
      },
      {id:"2",
        name: "Enrichment",
        tasks: enrichment,
      },
      {id:"3",
        name: "User Interaction",
        tasks: userInteraction,
      },
      {id:"4",
        name: "Response",
        tasks: response,
      },
      {id:"5",
        name: "Continuity",
        tasks: continuity,
      },
      {id:"6",
        name: "Procedural",
        tasks: procedural,
      },
    ],
  },
];

export default schema;
