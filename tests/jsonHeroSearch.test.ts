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
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "foo",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": undefined,
          "labelMatch": Array [
            Object {
              "end": 3,
              "start": 0,
            },
          ],
          "score": 262144,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "repo",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "description",
            },
          ],
        },
        "score": Object {
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
          "labelMatch": Array [
            Object {
              "end": 10,
              "start": 9,
            },
          ],
          "score": 6,
        },
      },
    ]
  `);

  expect(searcher.search("github")).toMatchInlineSnapshot(`
    Array [
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": undefined,
          "labelMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "score": 262144,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "id",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "name",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "repo",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "repo",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "id",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "repo",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "name",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
        },
      },
      Object {
        "item": JSONHeroPath {
          "components": Array [
            StartPathComponent {
              "isArray": false,
              "keyName": "$",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "github",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "profile",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "repo",
            },
            SimpleKeyPathComponent {
              "isArray": false,
              "keyName": "description",
            },
          ],
        },
        "score": Object {
          "descriptionMatch": Array [
            Object {
              "end": 6,
              "start": 0,
            },
          ],
          "labelMatch": Array [],
          "score": 95,
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

  expect(end - start).toBeLessThan(350);

  start = performance.now();

  searcher.search("url");

  end = performance.now();

  expect(end - start).toBeLessThan(10);
});
