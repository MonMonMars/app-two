import { ClientAppRoot } from "@/components/client-app-root";

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientAppRoot>{children}</ClientAppRoot>;
}
