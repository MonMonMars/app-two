import { PublicProfileView } from "@/components/public-profile-view";
import { profileById } from "@/lib/mock-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PublicProfilePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PublicProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = profileById(id);
  if (!profile) {
    return { title: "Profile not found · App Two" };
  }
  const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://app-two.example.com";
  return {
    title: `${profile.name}, ${profile.age} · App Two`,
    description: profile.bio,
    openGraph: {
      title: `${profile.name} on App Two`,
      description: profile.bio,
      url: `${siteUrl}/u/${id}`,
      images: [{ url: profile.photoUrl, width: 600, height: 800 }],
    },
  };
}

export default async function PublicProfilePage({
  params,
}: PublicProfilePageProps) {
  const { id } = await params;
  const profile = profileById(id);
  if (!profile) {
    notFound();
  }
  return <PublicProfileView profile={profile} />;
}
