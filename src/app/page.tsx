import Link from "next/link";
import { getClient } from "./../../lib/client";

import { gql } from "@apollo/client";

export default async function Home() {
  const TOPICS_QUERY = gql`
    query {
      topicCollection {
        items {
          title
          slug
        }
      }
    }
  `;

  const { data } = await getClient().query({
    query: TOPICS_QUERY,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex gap-4">
        {data.topicCollection.items.map((topic: Record<string, string>) => (
          <div key={topic.slug}>
            <Link
              className="p-3 bg-green-500 min-w-[100px] text-center hover:bg-green-700 cursor-pointer"
              href={`/topic/${topic.slug}`}
            >
              {topic.title}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
