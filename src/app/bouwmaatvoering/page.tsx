import { notFound } from "next/navigation";
import { ServicePage, serviceMetadata } from "@/components/ServicePage";
import { getServiceBySlug } from "@/data/services";

const service = getServiceBySlug("bouwmaatvoering");

export const metadata = service ? serviceMetadata(service) : {};

export default function Page() {
  if (!service) notFound();
  return <ServicePage service={service} />;
}
