import { search, SearchResult } from "../src/search";
import { IItemAccessor, prepareQuery } from "../src/fuzzyScoring";
import { JsonHeroPathAccessor } from "./utils/jsonHeroAccessor";

function doSearch<T>(
  items: T[],
  query: string,
  accessor: IItemAccessor<T>,
  allowNonContiguousMatches?: boolean,
): Array<SearchResult<T>> {
  const preparedQuery = prepareQuery(query);

  return search(
    items,
    preparedQuery,
    allowNonContiguousMatches ?? !preparedQuery.expectContiguousMatch,
    accessor,
  );
}

const json = {
  data: [
    {
      id: "1212092628029698048",
      text: "We believe the best future version of our API will come from building it with YOU. Here’s to another great year with everyone who builds on the Twitter platform. We can’t wait to continue working with you in the new year. https://t.co/yvxdK6aOo2",
      possibly_sensitive: false,
      referenced_tweets: [{ type: "replied_to", id: "1212092627178287104" }],
      entities: {
        urls: [
          {
            start: 222,
            end: 245,
            url: "https://t.co/yvxdK6aOo2",
            expanded_url: "https://twitter.com/LovesNandos/status/1211797914437259264/photo/1",
            display_url: "pic.twitter.com/yvxdK6aOo2",
          },
        ],
        annotations: [
          { start: 144, end: 150, probability: 0.626, type: "Product", normalized_text: "Twitter" },
        ],
      },
      author_id: "2244994945",
      public_metrics: { retweet_count: 8, reply_count: 2, like_count: 40, quote_count: 1 },
      lang: "en",
      created_at: "2019-12-31T19:26:16.000Z",
      source: "Twitter Web App",
      in_reply_to_user_id: "2244994945",
      attachments: { media_keys: ["16_1211797899316740096"] },
      context_annotations: [
        {
          domain: {
            id: "119",
            name: "Holiday",
            description: "Holidays like Christmas or Halloween",
          },
          entity: { id: "1186637514896920576", name: " New Years Eve" },
        },
        {
          domain: {
            id: "119",
            name: "Holiday",
            description: "Holidays like Christmas or Halloween",
          },
          entity: {
            id: "1206982436287963136",
            name: "Happy New Year: It’s finally 2020 everywhere!",
            description:
              "Catch fireworks and other celebrations as people across the globe enter the new year.\nPhoto via @GettyImages ",
          },
        },
        {
          domain: {
            id: "46",
            name: "Brand Category",
            description: "Categories within Brand Verticals that narrow down the scope of Brands",
          },
          entity: { id: "781974596752842752", name: "Services" },
        },
        {
          domain: { id: "47", name: "Brand", description: "Brands and Companies" },
          entity: { id: "10045225402", name: "Twitter" },
        },
        {
          domain: {
            id: "119",
            name: "Holiday",
            description: "Holidays like Christmas or Halloween",
          },
          entity: {
            id: "1206982436287963136",
            name: "Happy New Year: It’s finally 2020 everywhere!",
            description:
              "Catch fireworks and other celebrations as people across the globe enter the new year.\nPhoto via @GettyImages ",
          },
        },
      ],
    },
  ],
  includes: {
    tweets: [
      {
        possibly_sensitive: false,
        referenced_tweets: [{ type: "replied_to", id: "1212092626247110657" }],
        text: "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
        entities: {
          urls: [
            {
              start: 187,
              end: 210,
              url: "https://t.co/Vxp4UKnuJ9",
              expanded_url:
                "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
              display_url: "twitterdevfeedback.uservoice.com/forums/921790-…",
              images: [
                {
                  url: "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=orig",
                  width: 100,
                  height: 100,
                },
                {
                  url: "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=150x150",
                  width: 100,
                  height: 100,
                },
              ],
              status: 200,
              title: "Twitter Developer Feedback",
              description: "Share your feedback for the Twitter developer platform",
              unwound_url:
                "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
            },
          ],
        },
        author_id: "2244994945",
        public_metrics: { retweet_count: 3, reply_count: 1, like_count: 17, quote_count: 0 },
        lang: "en",
        created_at: "2019-12-31T19:26:16.000Z",
        source: "Twitter Web App",
        in_reply_to_user_id: "2244994945",
        id: "1212092627178287104",
      },
    ],
  },
} as unknown;

const jsonHeroPathAccessor = new JsonHeroPathAccessor(json);

const items = jsonHeroPathAccessor.createItems();

test("searching results", () => {
  const query = "tweet";
  const results = doSearch(items, query, jsonHeroPathAccessor, true);

  expect(results).toMatchInlineSnapshot(`
    Array [
      Object {
        "item": "$.includes.tweets",
        "score": Object {
          "labelMatch": Array [
            Object {
              "end": 5,
              "start": 0,
            },
          ],
          "score": 131223,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets",
        "score": Object {
          "labelMatch": Array [
            Object {
              "end": 16,
              "start": 11,
            },
          ],
          "score": 65600,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets",
        "score": Object {
          "labelMatch": Array [
            Object {
              "end": 16,
              "start": 11,
            },
          ],
          "score": 65600,
        },
      },
      Object {
        "item": "$.data.0.public_metrics.retweet_count",
        "score": Object {
          "labelMatch": Array [
            Object {
              "end": 7,
              "start": 2,
            },
          ],
          "score": 65596,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.retweet_count",
        "score": Object {
          "labelMatch": Array [
            Object {
              "end": 7,
              "start": 2,
            },
          ],
          "score": 65596,
        },
      },
      Object {
        "item": "$.includes.tweets.0.text",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "rawValueMatch": Array [
            Object {
              "end": 1,
              "start": 0,
            },
            Object {
              "end": 38,
              "start": 37,
            },
            Object {
              "end": 52,
              "start": 50,
            },
            Object {
              "end": 90,
              "start": 89,
            },
          ],
          "score": 88,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.unwound_url",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "rawValueMatch": Array [
            Object {
              "end": 10,
              "start": 8,
            },
            Object {
              "end": 21,
              "start": 19,
            },
            Object {
              "end": 60,
              "start": 59,
            },
          ],
          "score": 85,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.expanded_url",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "rawValueMatch": Array [
            Object {
              "end": 10,
              "start": 8,
            },
            Object {
              "end": 21,
              "start": 19,
            },
            Object {
              "end": 60,
              "start": 59,
            },
          ],
          "score": 85,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.description",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "rawValueMatch": Array [
            Object {
              "end": 30,
              "start": 28,
            },
            Object {
              "end": 40,
              "start": 39,
            },
            Object {
              "end": 44,
              "start": 43,
            },
            Object {
              "end": 50,
              "start": 49,
            },
          ],
          "score": 81,
        },
      },
      Object {
        "item": "$.includes.tweets.0.id",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.lang",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.source",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.author_id",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.created_at",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.possibly_sensitive",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.end",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.in_reply_to_user_id",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.url",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.start",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.title",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets.0.id",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.status",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets.0.type",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.like_count",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.quote_count",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.reply_count",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.display_url",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0.url",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1.url",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0.width",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1.width",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0.height",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1.height",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets.0",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "labelMatch": Array [],
          "score": 65,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets.0.id",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 23,
              "start": 18,
            },
          ],
          "labelMatch": Array [],
          "score": 64,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets.0.type",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 23,
              "start": 18,
            },
          ],
          "labelMatch": Array [],
          "score": 64,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets.0",
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 23,
              "start": 18,
            },
          ],
          "labelMatch": Array [],
          "score": 64,
        },
      },
      Object {
        "item": "$.data.0.text",
        "score": Object {
          "rawValueMatch": Array [
            Object {
              "end": 146,
              "start": 144,
            },
            Object {
              "end": 214,
              "start": 213,
            },
            Object {
              "end": 218,
              "start": 217,
            },
            Object {
              "end": 231,
              "start": 230,
            },
          ],
          "score": 16,
        },
      },
      Object {
        "item": "$.data.0.entities.urls.0.expanded_url",
        "score": Object {
          "rawValueMatch": Array [
            Object {
              "end": 10,
              "start": 8,
            },
            Object {
              "end": 14,
              "start": 13,
            },
            Object {
              "end": 24,
              "start": 23,
            },
            Object {
              "end": 63,
              "start": 62,
            },
          ],
          "score": 15,
        },
      },
      Object {
        "item": "$.data.0.context_annotations.1.entity.description",
        "score": Object {
          "rawValueMatch": Array [
            Object {
              "end": 73,
              "start": 72,
            },
            Object {
              "end": 79,
              "start": 78,
            },
            Object {
              "end": 82,
              "start": 81,
            },
            Object {
              "end": 100,
              "start": 98,
            },
          ],
          "score": 15,
        },
      },
      Object {
        "item": "$.data.0.context_annotations.4.entity.description",
        "score": Object {
          "rawValueMatch": Array [
            Object {
              "end": 73,
              "start": 72,
            },
            Object {
              "end": 79,
              "start": 78,
            },
            Object {
              "end": 82,
              "start": 81,
            },
            Object {
              "end": 100,
              "start": 98,
            },
          ],
          "score": 15,
        },
      },
    ]
  `);
});
