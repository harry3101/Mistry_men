const API_BASE = import.meta.env.VITE_API_URL ?? "";

export function apiUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${normalized}`;
}

export type ServiceRequestPayload = {
  name: string;
  email: string;
  phone: string;
  address: string;
  product: string;
  issue: string;
  serviceType: string;
  preferredDate: string;
  timeSlot: string;
  notes?: string;
};

export type ServiceRequestResponse = {
  success: boolean;
  message: string;
  emailSent?: boolean;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    product: string;
    issue: string;
    serviceType: string;
    preferredDate: string;
    timeSlot: string;
    notes?: string;
    status: string;
    createdAt: string;
  };
};

export async function submitServiceRequest(payload: ServiceRequestPayload) {
  const res = await fetch(apiUrl("/api/service-requests"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json()) as ServiceRequestResponse & { message?: string };

  if (!res.ok) {
    throw new Error(data.message || "Failed to submit service request");
  }

  return data;
}
