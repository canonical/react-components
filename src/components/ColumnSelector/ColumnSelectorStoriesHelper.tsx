import React from "react";
import { MainTableRow } from "components/MainTable/MainTable";

export const STATUS = "Status";
export const NAME = "Name";
export const TYPE = "Type";
export const CLUSTER_MEMBER = "Cluster member";
export const DESCRIPTION = "Description";
export const MEMORY = "Memory";
export const FILESYSTEM = "Root filesystem";
export const IPV4 = "IPv4";
export const IPV6 = "IPv6";
export const SNAPSHOTS = "Snapshots";
export const PROJECT = "Project";

export const COLUMN_HEADERS = [
  NAME,
  TYPE,
  PROJECT,
  CLUSTER_MEMBER,
  MEMORY,
  FILESYSTEM,
  DESCRIPTION,
  IPV4,
  IPV6,
  SNAPSHOTS,
  STATUS,
];

// All columns except name and status
export const USER_HIDEABLE_COLUMNS = [
  TYPE,
  PROJECT,
  CLUSTER_MEMBER,
  MEMORY,
  FILESYSTEM,
  DESCRIPTION,
  IPV4,
  IPV6,
  SNAPSHOTS,
];

const INSTANCES = [
  {
    name: "darling-bunny",
    type: "VM",
    project: "default",
    clusterMember: "-",
    memory: "1.4 GiB of 1.9 GiB",
    fileSystem: "3.3 GiB of 9.5 GiB",
    description:
      "Meet darling-bunny, a speedy little instance hopping along with your latest project. It's got the ears for listening to your commands and the nose for sniffing out the best performance. Handle with care, and remember to feed it plenty of CPU.",
    ipv4: ["10.138.32.6"],
    ipv6: [
      "fd42:6a38:859a:587d:216:3eff:fe43:167e",
      "fe80::216:3eff:fe43:167e",
      "fe80::1050:62ff:feb2:964c",
    ],
    status: "Running",
  },
  {
    name: "sassy-salamander",
    type: "VM",
    project: "default",
    clusterMember: "-",
    memory: "1.4 GiB of 1.9 GiB",
    fileSystem: "3.3 GiB of 9.5 GiB",
    description:
      "sassy-salamander is a resilient and feisty instance, perfectly at home in any environment—from the scorching heat of a web server to the damp coolness of a database. Don't let its size fool you; it's quick, adaptable, and not afraid to tackle complex tasks.",
    ipv4: ["10.138.32.6"],
    ipv6: [
      "fd42:6a38:859a:587d:216:3eff:fe43:167e",
      "fe80::216:3eff:fe43:167e",
      "fe80::1050:62ff:feb2:964c",
    ],
    status: "Running",
  },
  {
    name: "fun-feline",
    type: "Container",
    project: "default",
    clusterMember: "-",
    memory: "0.7 GiB of 1.9 GiB",
    fileSystem: "1.1 GiB of 9.5 GiB",
    description:
      "fun-feline is a purr-fectly agile and independent instance. It’s got nine lives for all your testing needs and a mischievous spirit for tackling the toughest tasks. Just be sure to give it enough RAM—it loves to stretch out.",
    ipv4: ["10.138.32.6"],
    ipv6: [
      "fd42:6a38:859a:587d:216:3eff:fe43:167e",
      "fe80::216:3eff:fe43:167e",
      "fe80::1050:62ff:feb2:964c",
    ],
    snapshots: ["1", "2"],
    status: "Stopped",
  },
];

export const getRows = (): MainTableRow[] => {
  const instanceRows: MainTableRow[] = INSTANCES.map((instance) => {
    return {
      key: instance.name,
      name: instance.name,
      columns: [
        {
          content: instance.name,
          className: "u-truncate",
          title: `Instance ${instance.name}`,
          role: "rowheader",
          "aria-label": NAME, // needed
          onClick: () => console.log("Click on instance", instance.name),
        },
        {
          content: <span>{instance.type}</span>,
          className: "clickable-cell",
          role: "cell",
          "aria-label": TYPE, // needed
          onClick: () => console.log("Click on instance", instance.type),
        },
        {
          content: <a>{instance.project}</a>,
          role: "cell",
          "aria-label": PROJECT, // needed
        },
        {
          content: <a>{instance.clusterMember}</a>,
          role: "cell",
          "aria-label": CLUSTER_MEMBER, // needed
        },
        {
          content: instance.memory,
          className: "clickable-cell",
          role: "cell",
          "aria-label": MEMORY, // needed
          onClick: () => console.log("Click on instance", instance.memory),
        },
        {
          content: instance.fileSystem,
          className: "clickable-cell",
          role: "cell",
          "aria-label": FILESYSTEM, // needed
          onClick: () => console.log("Click on instance", instance.fileSystem),
        },
        {
          content: (
            <div className="u-truncate" title={instance.description}>
              {instance.description}
            </div>
          ),
          className: "clickable-cell",
          role: "cell",
          "aria-label": DESCRIPTION, // needed
          onClick: () => console.log("Click on instance", instance.description),
        },
        {
          key: `ipv4-${instance.ipv4.length}`,
          content: instance.ipv4.join(", "),
          className: "u-align--right clickable-cell",
          role: "cell",
          "aria-label": IPV4, // needed
          onClick: () => console.log("Click on instance", instance.ipv4),
        },
        {
          key: `ipv6-${instance.ipv6.length}`,
          content: instance.ipv6.join(", "),
          className: "clickable-cell",
          role: "cell",
          "aria-label": IPV6, // needed
          onClick: () => console.log("Click on instance", instance.ipv6),
        },
        {
          content: instance.snapshots?.length ?? "0",
          className: "u-align--right clickable-cell",
          role: "cell",
          "aria-label": SNAPSHOTS, // needed
          onClick: () =>
            console.log("Click on instance", instance.snapshots?.length),
        },
        {
          content: instance.status,
          role: "cell",
          className: "clickable-cell",
          "aria-label": STATUS, // needed
          onClick: () => console.log("Click on instance", instance.status),
        },
      ],
    };
  });

  return instanceRows;
};
