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
          "description": "includes",
          "formattedValue": undefined,
          "label": "tweets",
          "labelMatch": Array [
            Object {
              "end": 5,
              "start": 0,
            },
          ],
          "rawValue": undefined,
          "score": 131223,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets",
        "score": Object {
          "description": "data.0",
          "formattedValue": undefined,
          "label": "referenced_tweets",
          "labelMatch": Array [
            Object {
              "end": 16,
              "start": 11,
            },
          ],
          "rawValue": undefined,
          "score": 65600,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets",
        "score": Object {
          "description": "includes.tweets.0",
          "formattedValue": undefined,
          "label": "referenced_tweets",
          "labelMatch": Array [
            Object {
              "end": 16,
              "start": 11,
            },
          ],
          "rawValue": undefined,
          "score": 65600,
        },
      },
      Object {
        "item": "$.data.0.public_metrics.retweet_count",
        "score": Object {
          "description": "data.0.public_metrics",
          "formattedValue": "8",
          "label": "retweet_count",
          "labelMatch": Array [
            Object {
              "end": 7,
              "start": 2,
            },
          ],
          "rawValue": "8",
          "score": 65596,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.retweet_count",
        "score": Object {
          "description": "includes.tweets.0.public_metrics",
          "formattedValue": "3",
          "label": "retweet_count",
          "labelMatch": Array [
            Object {
              "end": 7,
              "start": 2,
            },
          ],
          "rawValue": "3",
          "score": 65596,
        },
      },
      Object {
        "item": "$.includes.tweets.0.text",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
          "label": "text",
          "labelMatch": Array [],
          "rawValue": "These launches would not be possible without the feedback you provided along the way, so THANK YOU to everyone who has contributed your time and ideas. Have more feedback? Let us know ⬇️ https://t.co/Vxp4UKnuJ9",
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
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
          "label": "unwound_url",
          "labelMatch": Array [],
          "rawValue": "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
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
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
          "label": "expanded_url",
          "labelMatch": Array [],
          "rawValue": "https://twitterdevfeedback.uservoice.com/forums/921790-twitter-developer-labs",
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
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "Share your feedback for the Twitter developer platform",
          "label": "description",
          "labelMatch": Array [],
          "rawValue": "Share your feedback for the Twitter developer platform",
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
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "1212092627178287104",
          "label": "id",
          "labelMatch": Array [],
          "rawValue": "1212092627178287104",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.lang",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "en",
          "label": "lang",
          "labelMatch": Array [],
          "rawValue": "en",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.source",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "Twitter Web App",
          "label": "source",
          "labelMatch": Array [],
          "rawValue": "Twitter Web App",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "entities",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.author_id",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "2244994945",
          "label": "author_id",
          "labelMatch": Array [],
          "rawValue": "2244994945",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.created_at",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "Tue Dec 31 2019 19:26:16 GMT+0000 (Greenwich Mean Time)",
          "label": "created_at",
          "labelMatch": Array [],
          "rawValue": "2019-12-31T19:26:16.000Z",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls",
        "score": Object {
          "description": "includes.tweets.0.entities",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "urls",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "public_metrics",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.possibly_sensitive",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "false",
          "label": "possibly_sensitive",
          "labelMatch": Array [],
          "rawValue": "false",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.end",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "210",
          "label": "end",
          "labelMatch": Array [],
          "rawValue": "210",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.in_reply_to_user_id",
        "score": Object {
          "description": "includes.tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "2244994945",
          "label": "in_reply_to_user_id",
          "labelMatch": Array [],
          "rawValue": "2244994945",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.url",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "https://t.co/Vxp4UKnuJ9",
          "label": "url",
          "labelMatch": Array [],
          "rawValue": "https://t.co/Vxp4UKnuJ9",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.start",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "187",
          "label": "start",
          "labelMatch": Array [],
          "rawValue": "187",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.title",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "Twitter Developer Feedback",
          "label": "title",
          "labelMatch": Array [],
          "rawValue": "Twitter Developer Feedback",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets.0.id",
        "score": Object {
          "description": "includes.tweets.0.referenced_tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "1212092626247110657",
          "label": "id",
          "labelMatch": Array [],
          "rawValue": "1212092626247110657",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "images",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.status",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "200",
          "label": "status",
          "labelMatch": Array [],
          "rawValue": "200",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets.0.type",
        "score": Object {
          "description": "includes.tweets.0.referenced_tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "replied_to",
          "label": "type",
          "labelMatch": Array [],
          "rawValue": "replied_to",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.like_count",
        "score": Object {
          "description": "includes.tweets.0.public_metrics",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "17",
          "label": "like_count",
          "labelMatch": Array [],
          "rawValue": "17",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.quote_count",
        "score": Object {
          "description": "includes.tweets.0.public_metrics",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "0",
          "label": "quote_count",
          "labelMatch": Array [],
          "rawValue": "0",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.public_metrics.reply_count",
        "score": Object {
          "description": "includes.tweets.0.public_metrics",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "1",
          "label": "reply_count",
          "labelMatch": Array [],
          "rawValue": "1",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.display_url",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "twitterdevfeedback.uservoice.com/forums/921790-…",
          "label": "display_url",
          "labelMatch": Array [],
          "rawValue": "twitterdevfeedback.uservoice.com/forums/921790-…",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0.url",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=orig",
          "label": "url",
          "labelMatch": Array [],
          "rawValue": "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=orig",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1.url",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images.1",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=150x150",
          "label": "url",
          "labelMatch": Array [],
          "rawValue": "https://pbs.twimg.com/news_img/1261301555787108354/9yR4UVsa?format=png&name=150x150",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0.width",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "100",
          "label": "width",
          "labelMatch": Array [],
          "rawValue": "100",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1.width",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images.1",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "100",
          "label": "width",
          "labelMatch": Array [],
          "rawValue": "100",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0.height",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images.0",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "100",
          "label": "height",
          "labelMatch": Array [],
          "rawValue": "100",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1.height",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images.1",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": "100",
          "label": "height",
          "labelMatch": Array [],
          "rawValue": "100",
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0",
        "score": Object {
          "description": "includes.tweets",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "0",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0",
        "score": Object {
          "description": "includes.tweets.0.entities.urls",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "0",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.referenced_tweets.0",
        "score": Object {
          "description": "includes.tweets.0.referenced_tweets",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "0",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.0",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "0",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.includes.tweets.0.entities.urls.0.images.1",
        "score": Object {
          "description": "includes.tweets.0.entities.urls.0.images",
          "descriptionMatch": Array [
            Object {
              "end": 14,
              "start": 9,
            },
          ],
          "formattedValue": undefined,
          "label": "1",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 65,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets.0.id",
        "score": Object {
          "description": "data.0.referenced_tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 23,
              "start": 18,
            },
          ],
          "formattedValue": "1212092627178287104",
          "label": "id",
          "labelMatch": Array [],
          "rawValue": "1212092627178287104",
          "score": 64,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets.0.type",
        "score": Object {
          "description": "data.0.referenced_tweets.0",
          "descriptionMatch": Array [
            Object {
              "end": 23,
              "start": 18,
            },
          ],
          "formattedValue": "replied_to",
          "label": "type",
          "labelMatch": Array [],
          "rawValue": "replied_to",
          "score": 64,
        },
      },
      Object {
        "item": "$.data.0.referenced_tweets.0",
        "score": Object {
          "description": "data.0.referenced_tweets",
          "descriptionMatch": Array [
            Object {
              "end": 23,
              "start": 18,
            },
          ],
          "formattedValue": undefined,
          "label": "0",
          "labelMatch": Array [],
          "rawValue": undefined,
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
