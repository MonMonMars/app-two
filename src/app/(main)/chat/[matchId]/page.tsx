import { ChatThread } from "@/components/chat-thread";

export const dynamic = "force-dynamic";

type ChatPageProps = {
  params: Promise<{ matchId: string }>;
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { matchId } = await params;
  return <ChatThread matchId={matchId} />;
}
