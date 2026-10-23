import type { AssetStatus } from "@/components/molecules/AssetCard";
import type { RequestStatus } from "@/components/atoms/StatusBadge";

/**
 * Local fixture data for the demo. There is no backend in this build — these
 * stand in for API responses and are shaped to match what a real endpoint
 * would return.
 */

export type Asset = {
  id: string;
  name: string;
  category: string;
  location: string;
  condition: string;
  value: string;
  availability: string;
  status: AssetStatus;
  icon: "laptop" | "camera" | "package";
};

export const assets: Asset[] = [
  {
    id: "AST-0142",
    name: 'MacBook Pro 14"',
    category: "Laptop",
    location: "Jakarta",
    condition: "Good condition",
    value: "Rp 15.000.000",
    availability: "Available 22 Oct – 5 Nov",
    status: "Available",
    icon: "laptop",
  },
  {
    id: "AST-0207",
    name: "Sony A7 IV Camera",
    category: "Camera",
    location: "Jakarta",
    condition: "Good condition",
    value: "Rp 38.000.000",
    availability: "Available 22 Oct – 25 Oct",
    status: "Available",
    icon: "camera",
  },
  {
    id: "AST-0118",
    name: "Dell Latitude 7440",
    category: "Laptop",
    location: "Bandung",
    condition: "Good condition",
    value: "Rp 14.500.000",
    availability: "Back on 28 Oct",
    status: "On Loan",
    icon: "laptop",
  },
  {
    id: "AST-0066",
    name: "Epson EB-X49 Projector",
    category: "Projector",
    location: "Jakarta",
    condition: "Lens damaged",
    value: "Rp 7.200.000",
    availability: "In repair · not bookable",
    status: "Under repair",
    icon: "package",
  },
  {
    id: "AST-0301",
    name: 'iPad Air 11"',
    category: "Tablet",
    location: "Surabaya",
    condition: "Good condition",
    value: "Rp 9.500.000",
    availability: "Available 22 Oct – 5 Nov",
    status: "Available",
    icon: "package",
  },
  {
    id: "AST-0044",
    name: "Logitech Brio Webcam",
    category: "Accessory",
    location: "Jakarta",
    condition: "Lost",
    value: "Rp 2.100.000",
    availability: "Retired · not bookable",
    status: "Retired",
    icon: "package",
  },
];

export const categories = [
  "Laptop",
  "Camera",
  "Projector",
  "Tablet",
  "Accessory",
];

export const locations = ["Jakarta", "Bandung", "Surabaya"];

/* ---------------------------------------------------------------- loans -- */

export type Loan = {
  id: string;
  asset: string;
  borrower: string;
  dates: string;
  status: RequestStatus;
};

export const loans: Loan[] = [
  {
    id: "REQ-0231",
    asset: 'MacBook Pro 14"',
    borrower: "Ayu Pratama",
    dates: "22 Oct – 5 Nov",
    status: "On Loan",
  },
  {
    id: "REQ-0228",
    asset: "Sony A7 IV Camera",
    borrower: "Ayu Pratama",
    dates: "1 Oct – 14 Oct",
    status: "Overdue",
  },
  {
    id: "REQ-0219",
    asset: 'iPad Air 11"',
    borrower: "Ayu Pratama",
    dates: "12 Sep – 25 Sep",
    status: "Returned",
  },
  {
    id: "REQ-0244",
    asset: "Dell Latitude 7440",
    borrower: "Ayu Pratama",
    dates: "28 Oct – 10 Nov",
    status: "Pending Manager",
  },
];

/** Timeline for the loan-detail screen. */
export const loanTimeline = [
  {
    state: "done" as const,
    title: "Request submitted",
    detail: "REQ-0231 · Ayu Pratama",
    timestamp: "18 Oct, 09:12",
  },
  {
    state: "done" as const,
    title: "Approved by Budi Santoso",
    detail: "Line Manager",
    timestamp: "18 Oct, 14:03",
  },
  {
    state: "done" as const,
    title: "Handover completed",
    detail: "Collected from GA desk, Jakarta",
    timestamp: "22 Oct, 08:45",
  },
  {
    state: "current" as const,
    title: "On loan",
    detail: "Due back 5 Nov",
    timestamp: "now",
  },
];

/* ------------------------------------------------------- manager queue -- */

export type Approval = {
  id: string;
  asset: string;
  borrower: string;
  reason: string;
  dates: string;
  status: RequestStatus;
};

export const approvals: Approval[] = [
  {
    id: "REQ-0244",
    asset: "Dell Latitude 7440",
    borrower: "Ayu Pratama",
    reason: "Client workshop onsite",
    dates: "28 Oct – 10 Nov",
    status: "Pending Manager",
  },
  {
    id: "REQ-0245",
    asset: 'iPad Air 11"',
    borrower: "Dewi Lestari",
    reason: "Design review",
    dates: "30 Oct – 6 Nov",
    status: "Pending Manager",
  },
  {
    id: "REQ-0246",
    asset: "Epson EB-X49 Projector",
    borrower: "Raka Wijaya",
    reason: "Town hall screening",
    dates: "2 Nov – 9 Nov",
    status: "Pending GA",
  },
];

/* ------------------------------------------------------------ GA queues -- */

export type Handover = {
  id: string;
  asset: string;
  borrower: string;
  slot: string;
  office: string;
  status: RequestStatus;
};

export const handovers: Handover[] = [
  {
    id: "REQ-0247",
    asset: 'MacBook Pro 14"',
    borrower: "Ayu Pratama",
    slot: "22 Oct, 09:00",
    office: "Jakarta",
    status: "Pending GA",
  },
  {
    id: "REQ-0248",
    asset: "Sony A7 IV Camera",
    borrower: "Dewi Lestari",
    slot: "23 Oct, 10:30",
    office: "Jakarta",
    status: "Pending GA",
  },
];

export const returns = [
  {
    id: "REQ-0228",
    asset: "Sony A7 IV Camera",
    borrower: "Ayu Pratama",
    due: "14 Oct",
    state: "Overdue",
  },
  {
    id: "REQ-0250",
    asset: 'iPad Air 11"',
    borrower: "Raka Wijaya",
    due: "21 Oct",
    state: "On Loan",
  },
];

/* ------------------------------------------------------------- personas -- */

export const currentUser = {
  name: "Ayu Pratama",
  role: "Employee",
};