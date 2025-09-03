import prisma from "@/lib/prisma";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-semibold mb-6">Contact Messages</h1>
      <div className="space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className="border border-neutral-800 rounded-xl p-4 bg-neutral-900/50"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium">{m.name} • {m.email}</p>
              <span className="text-xs text-neutral-400">
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-neutral-300 whitespace-pre-wrap">{m.message}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
