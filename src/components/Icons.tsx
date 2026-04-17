import React from "react";

type P = React.SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 18): React.SVGProps<SVGSVGElement> => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none",
  stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round",
});

export const IconDashboard = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/></svg>
);
export const IconWallet = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M3 7a2 2 0 0 1 2-2h12l4 4v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M16 13h2"/><path d="M3 9h14"/></svg>
);
export const IconList = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
);
export const IconBudget = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 4"/></svg>
);
export const IconFamily = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M14.5 20c0-2.5 1.8-4.5 4-4.5s2.5 1.5 2.5 4"/></svg>
);
export const IconChart = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>
);
export const IconLoan = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 10l-4 4 4 4"/><path d="M3 14h13a5 5 0 0 0 5-5"/><path d="M17 14l4-4-4-4"/></svg>
);
export const IconSettings = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>
);
export const IconArrowUp = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
);
export const IconArrowDown = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
);
export const IconPlus = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 5v14M5 12h14"/></svg>
);
export const IconSearch = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
);
export const IconBell = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
export const IconFilter = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M3 6h18M6 12h12M10 18h4"/></svg>
);
export const IconExport = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>
);
export const IconCheck = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m5 12 5 5L20 7"/></svg>
);
export const IconClock = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
);
export const IconTransfer = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M7 10h14M21 10l-4-4M17 14H3M3 14l4 4"/></svg>
);
export const IconShield = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/></svg>
);
export const IconBolt = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>
);
export const IconChevron = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><path d="m9 6 6 6-6 6"/></svg>
);
export const IconDot = ({ size, ...p }: P) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>
);
