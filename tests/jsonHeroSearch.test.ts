import { readFileSync } from "node:fs";
import path from "node:path";
import { JSONHeroSearch } from "../src";

test("JSONHeroSearch can search with just json and a query", () => {
  const json = {
    foo: "bar",
    baz: "qux",
    user: {
      email: "eric@stackhero.run",
      name: "Eric",
      age: 27,
      photos: [
        {
          url: "https://avatars0.githubusercontent.com/u/1234?v=4",
          width: 100,
          height: 100,
          createdAt: "2020-01-01T00:00:00.000Z",
        },
      ],
    },
    github: {
      profile: {
        id: "ericallam",
        name: "Eric Allam",
        repo: {
          id: "ericallam/jsonhero",
          name: "jsonhero",
          description: "A JSON IDE for the web",
        },
      },
    },
  };

  const searcher = new JSONHeroSearch(json);

  expect(searcher.search("foo")).toMatchInlineSnapshot(`
    Array [
      Object {
        "item": "$.foo",
        "score": Object {
          "description": "",
          "descriptionMatch": undefined,
          "formattedValue": "bar",
          "label": "foo",
          "labelMatch": Array [
            Object {
              "end": 3,
              "start": 0,
            },
          ],
          "rawValue": "bar",
          "score": 262144,
        },
      },
      Object {
        "item": "$.github.profile.repo.description",
        "score": Object {
          "description": "github.profile.repo",
          "descriptionMatch": Array [
            Object {
              "end": 11,
              "start": 10,
            },
            Object {
              "end": 19,
              "start": 18,
            },
          ],
          "formattedValue": "A JSON IDE for the web",
          "label": "description",
          "labelMatch": Array [
            Object {
              "end": 10,
              "start": 9,
            },
          ],
          "rawValue": "A JSON IDE for the web",
          "score": 6,
        },
      },
    ]
  `);

  expect(searcher.search("github")).toMatchInlineSnapshot(`
    Array [
      Object {
        "item": "$.github",
        "score": Object {
          "description": "",
          "descriptionMatch": undefined,
          "formattedValue": undefined,
          "label": "github",
          "labelMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "rawValue": undefined,
          "score": 262144,
        },
      },
      Object {
        "item": "$.github.profile",
        "score": Object {
          "description": "github",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": undefined,
          "label": "profile",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 95,
        },
      },
      Object {
        "item": "$.github.profile.id",
        "score": Object {
          "description": "github.profile",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": "ericallam",
          "label": "id",
          "labelMatch": Array [],
          "rawValue": "ericallam",
          "score": 95,
        },
      },
      Object {
        "item": "$.github.profile.name",
        "score": Object {
          "description": "github.profile",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": "Eric Allam",
          "label": "name",
          "labelMatch": Array [],
          "rawValue": "Eric Allam",
          "score": 95,
        },
      },
      Object {
        "item": "$.github.profile.repo",
        "score": Object {
          "description": "github.profile",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": undefined,
          "label": "repo",
          "labelMatch": Array [],
          "rawValue": undefined,
          "score": 95,
        },
      },
      Object {
        "item": "$.github.profile.repo.id",
        "score": Object {
          "description": "github.profile.repo",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": "ericallam/jsonhero",
          "label": "id",
          "labelMatch": Array [],
          "rawValue": "ericallam/jsonhero",
          "score": 95,
        },
      },
      Object {
        "item": "$.github.profile.repo.name",
        "score": Object {
          "description": "github.profile.repo",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": "jsonhero",
          "label": "name",
          "labelMatch": Array [],
          "rawValue": "jsonhero",
          "score": 95,
        },
      },
      Object {
        "item": "$.github.profile.repo.description",
        "score": Object {
          "description": "github.profile.repo",
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "formattedValue": "A JSON IDE for the web",
          "label": "description",
          "labelMatch": Array [],
          "rawValue": "A JSON IDE for the web",
          "score": 95,
        },
      },
      Object {
        "item": "$.user.photos.0.url",
        "score": Object {
          "description": "user.photos.0",
          "formattedValue": "https://avatars0.githubusercontent.com/u/1234?v=4",
          "label": "url",
          "rawValue": "https://avatars0.githubusercontent.com/u/1234?v=4",
          "rawValueMatch": Array [
            Object {
              "end": 23,
              "start": 17,
            },
          ],
          "score": 87,
        },
      },
    ]
  `);
});

test("custom formatter option", () => {
  const json = {
    dateString: "2020-01-01T00:00:00.000Z",
  };

  function dateStringFormatter(value: unknown): string | undefined {
    if (typeof value === "string") {
      try {
        return new Date(value).toString();
      } catch {
        return value;
      }
    }

    return;
  }

  const searcher = new JSONHeroSearch(json, { formatter: dateStringFormatter });

  const results = searcher.search("Jan");

  expect(results.length).toBe(1);
  expect(results).toMatchInlineSnapshot(`
    Array [
      Object {
        "item": "$.dateString",
        "score": Object {
          "description": "",
          "formattedValue": "Wed Jan 01 2020 00:00:00 GMT+0000 (Greenwich Mean Time)",
          "formattedValueMatch": Array [
            Object {
              "end": 7,
              "start": 4,
            },
          ],
          "label": "dateString",
          "rawValue": "2020-01-01T00:00:00.000Z",
          "score": 23,
        },
      },
    ]
  `);
});

test("JSONHeroSearch should be fast enough, and results cached", () => {
  // Read in fixtures/airtable.json
  const json = JSON.parse(readFileSync(path.join(__dirname, "fixtures/airtable.json"), "utf8"));

  const searcher = new JSONHeroSearch(json);
  searcher.prepareIndex();

  let start = performance.now();

  searcher.search("url");

  let end = performance.now();

  expect(end - start).toBeLessThan(500);

  start = performance.now();

  searcher.search("url");

  end = performance.now();

  expect(end - start).toBeLessThan(10);
});
