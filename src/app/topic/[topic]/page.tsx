// get staticParams

import { gql } from "@apollo/client";
import Link from "next/link";
import { getClient } from "../../../../lib/client";

const Topic = async ({ params: { topic } }: { params: { topic: string } }) => {
  // use gql

  const BLOG_TOPIC = gql`
    query BlogWithTopics($title: String) {
      topicCollection(where: { title: $title }, limit: 1) {
        items {
          linkedFrom {
            productCollection {
              items {
                title
                slug
                topicsCollection {
                  items {
                    slug
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const {
    data: {
      topicCollection: { items },
    },
  } = await getClient().query({
    query: BLOG_TOPIC,
    variables: {
      title: topic,
    },
  });

  return (
    <div className="p-10">
      <Link href="/">Back </Link>
      Topic {topic}
      {items.map((item: any) => (
        <>
          {item.linkedFrom.productCollection.items.map((elem: any) => (
            <div className="border p-6 m-6" key={elem.title}>
              <p> {elem.title} </p>
              <p>{elem.slug}</p>
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default Topic;
