/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { JSONHeroSearch } = require("./lib");

const json = {
  records: [
    {
      id: "rec3SDRbI5izJ0ENy",
      fields: {
        Link: "www.examplelink.com",
        Name: "Ikrore chair",
        Settings: ["Office", "Bedroom", "Living room"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Grey", "Green", "Red", "White", "Blue purple"],
        Designer: ["recJ76rS7fEJi03wW"],
        Type: "Chairs",
        Images: [
          {
            id: "atten0ycxONEmeKfu",
            width: 501,
            height: 750,
            url: "https://dl.airtable.com/.attachments/e13d90aafb01450314538eee5398abb3/ea5e6e6f/pexels-photo-1166406.jpegautocompresscstinysrgbh750w1260",
            filename: "pexels-photo-1166406.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            size: 33496,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/ff3db1021522f6100afa7e09ab42b187/9bc0dc81",
                width: 24,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/15421f668579a7d75c506253b61668d6/f7c14834",
                width: 501,
                height: 750,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/bd297cad0f2acb7da5d63e0692934def/3053bea3",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Tech suede", "Light wood"],
        "Size (WxLxH)": "40x32x19",
        "Unit cost": 1300.5,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T20:16:05.000Z",
    },
    {
      id: "rec4gR4daG7FLbTss",
      fields: {
        Link: "www.examplelink.com",
        Name: "Angular pendant",
        Settings: ["Office"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Silver", "Black", "White", "Gold"],
        Designer: ["recoh9S9UjHVUpcPy"],
        "In stock": true,
        Type: "Lighting",
        Orders: ["recspa0dTuVfr5Tji"],
        Images: [
          {
            id: "attViFaKwjE6WJ3iD",
            width: 1000,
            height: 1500,
            url: "https://dl.airtable.com/.attachments/ce5d081b96ad1d4ef7aa3003c77fb761/4e9b68ae/photo-1546902172-146006dcd1e6ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1546902172-146006dcd1e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 163784,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/ffa7089696c170c6be567d5f34b4ed66/e1046fbc",
                width: 24,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/e66162154bfa7eacd377d40266f57316/39fb0eac",
                width: 512,
                height: 768,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/7070d3cb16ad9d18e4fa5bbedb4e740b/460fd6c4",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Steel"],
        "Size (WxLxH)": "7.5 x 12.75, 10.5 x 17.5 ",
        "Unit cost": 295,
        "Total units sold": 2,
        "Gross sales": 590,
      },
      createdTime: "2015-01-27T19:14:59.000Z",
    },
    {
      id: "rec4rIuzOPQA07c3M",
      fields: {
        Link: "www.examplelink.com",
        Name: "Madrid chair",
        Settings: ["Living room", "Office"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["White", "Brown", "Black"],
        Designer: ["recqx2njQY1QqkcaV"],
        "In stock": true,
        Type: "Chairs",
        Orders: ["rec0jJArKIPxTddSX", "rec3mEIxLONBSab4Y"],
        Images: [
          {
            id: "attYAf0fLp3H3OdGk",
            width: 1000,
            height: 477,
            url: "https://dl.airtable.com/.attachments/c717b870174222c61991d81d32e6faa4/1ef6556a/photo-1505843490538-5133c6c7d0e1ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 17498,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/c3e8f6f2189b0d9eb14cb58b9c653f42/3b76d95a",
                width: 75,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/e222fd421eddb24f9b5171a25adaa9ec/3cf86de6",
                width: 1000,
                height: 477,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/4cae754b4adc96820e98a79ca8ebdcbd/09040841",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Light wood", "Metal"],
        "Size (WxLxH)": "3x1x5",
        "Unit cost": 5429,
        "Total units sold": 36,
        "Gross sales": 195444,
      },
      createdTime: "2014-09-24T05:48:20.000Z",
    },
    {
      id: "recBFo9FzF6WKrgN6",
      fields: {
        Link: "www.examplelink.com",
        Name: "Drux table lamp",
        Settings: ["Living room", "Office", "Bedroom"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Beige"],
        "In stock": true,
        Type: "Lighting",
        Images: [
          {
            id: "attp536Smad59jyla",
            width: 1000,
            height: 667,
            url: "https://dl.airtable.com/.attachments/2286e1e54efa0c4c5fd7b55ece6ca823/2c6d2881/photo-1517991104123-1d56a6e81ed9ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1517991104123-1d56a6e81ed9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 68041,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/ff54f1100a889a34635bc9aaf3b5c20d/cd82feb5",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/496ebcea5a4c00cb2fc1a2b4fc9bed65/48d4c29b",
                width: 768,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/fbd305226389dc0490692708407bfb56/a01ff950",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Linen shade", "Light wood"],
        "Size (WxLxH)": "14 x 19",
        "Unit cost": 249,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T19:32:12.000Z",
    },
    {
      id: "recCGiMUCCGp68MCK",
      fields: {
        Link: "www.examplelink.com",
        Name: "Twist side table",
        Settings: ["Living room"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Beige", "Grey"],
        Designer: ["recfb5rmXwdm6LNoo"],
        Type: "Tables",
        Orders: ["recNvcuOyJ1FymJ6O"],
        Images: [
          {
            id: "attBNs3uKN8EeLLwd",
            width: 1000,
            height: 667,
            url: "https://dl.airtable.com/.attachments/cfa21745dc2a50d1c62998834e4b4ee5/a843884d/photo-1507392671925-cbcf789b478dixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1507392671925-cbcf789b478d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 73008,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/27d6af299bd87005498cf836c8dd2d76/d41b63ac",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/33e0f6df42aacd24701c8c265b268dad/1509733e",
                width: 768,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/c1b60459eb765235d00b4a54110c84ba/ef82545e",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Light wood", "Steel"],
        "Size (WxLxH)": "20x20",
        "Unit cost": 1190,
        "Total units sold": 6,
        "Gross sales": 7140,
      },
      createdTime: "2015-01-27T21:08:17.000Z",
    },
    {
      id: "recFeWSbSQuoPAuOD",
      fields: {
        Link: "www.examplelink.com",
        Name: "Compel bookcase",
        Settings: ["Living room", "Office"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Black"],
        Designer: ["receFxQ9bUODXrYwv"],
        "In stock": true,
        Type: "Bookshelves",
        Orders: ["reciqXiKe6VxKhXQt"],
        Images: [
          {
            id: "attumnpGmMgmf04Uz",
            width: 563,
            height: 750,
            url: "https://dl.airtable.com/.attachments/345f743bec40372349993d2325ea8b0c/b97de268/pexels-photo-2067569.jpegautocompresscstinysrgbh750w1260",
            filename: "pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            size: 77609,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/ad5bee131f93f45cf9a748348f1a1954/dbaeac82",
                width: 27,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/ae1c61f4dd2dd705a1bccb6c311d321e/d6da82cf",
                width: 512,
                height: 682,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/b52e81302847db42be4da56316ae6538/914b6689",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Dark wood"],
        "Size (WxLxH)": "14x16 and 14x79.5",
        "Unit cost": 218,
        "Total units sold": 2,
        "Gross sales": 436,
      },
      createdTime: "2015-01-27T20:06:03.000Z",
    },
    {
      id: "recKVCoiSBG9B3RU2",
      fields: {
        Notes:
          'Going to use this chair in the office design for Apse Realty <airtable:mention id="men7PB6OEeT9J8YdK">@Lane Bergman</airtable:mention> ',
        Link: "www.examplelink.com",
        Name: "Nebula chair",
        Settings: ["Office", "Bedroom"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["White", "Brown", "Cherry", "Black"],
        Designer: ["recnONq5IbG8RyBLp"],
        Type: "Chairs",
        Images: [
          {
            id: "attmbNMd04nNviHUV",
            width: 1000,
            height: 1500,
            url: "https://dl.airtable.com/.attachments/33cec7be64f0cab3b249dc0d7e587ea7/9a77c2c6/photo-1519947486511-46149fa0a254ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1519947486511-46149fa0a254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 159823,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/b2b274ad3ca86bc6c4f0c7b70ad16d74/7d0c5454",
                width: 24,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/1c8dddc86d0ce3283018e7246cc95004/a3dd69dc",
                width: 512,
                height: 768,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/c196c8eddbd4a1abc182819e65db38ce/04705788",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Lacquered ash", "Light wood"],
        "Size (WxLxH)": 'H 31.75" W 18" D 19.75" Seat H 17.25"',
        "Unit cost": 382.25,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T19:16:56.000Z",
    },
    {
      id: "recVSt2jMwxnCywtw",
      fields: {
        Link: "www.examplelink.com",
        Name: "Xu table tamp",
        Settings: ["Office"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Red", "White", "Shiny black", "Framboise"],
        Designer: ["rech4R2WIhpbaETDn"],
        "In stock": true,
        Type: "Lighting",
        Images: [
          {
            id: "attp8Ld4TSuNkW4fK",
            width: 1000,
            height: 1333,
            url: "https://dl.airtable.com/.attachments/e39c0d197d24c696ffb8482bba38d939/559c4433/photo-1542728928-1413d1894ed1ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1542728928-1413d1894ed1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 66269,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/25d0921c3675e8d6f2e1d95f697a94fb/91731656",
                width: 27,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/fc16fb8b6525bcc7b5eec00dcaeea4d1/66065a34",
                width: 512,
                height: 682,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/1757c7b5aa04c44145a0a62f1f1c68ef/406bfddc",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Brass"],
        "Size (WxLxH)": "16.75x8",
        "Unit cost": 864,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T19:12:50.000Z",
    },
    {
      id: "recZnPBw7PW80dmMM",
      fields: {
        Link: "www.examplelink.com",
        Name: "Strul rug",
        Settings: ["Living room", "Bedroom", "Office"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Cream"],
        Designer: ["rec2jCgHzKymGnXQd"],
        "In stock": true,
        Type: "Rugs",
        Images: [
          {
            id: "attQ4U3AUk9l8BCuY",
            width: 1132,
            height: 750,
            url: "https://dl.airtable.com/.attachments/de02834100d5cc4bd640669317512bbf/00e9bfa0/pexels-photo-317333.jpegautocompresscstinysrgbh750w1260",
            filename: "pexels-photo-317333.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            size: 108134,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/c13474dc83287a8b23c98a7ba5d101fe/5d46045d",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/06e19742f3183aead028c8affec72f99/4c54fd1a",
                width: 773,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/166d0ab1064ff099c73f77ac65261f21/fcdc0a5c",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Indian wool"],
        "Size (WxLxH)": "10 x 8",
        "Unit cost": 3304.8,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T19:36:06.000Z",
    },
    {
      id: "recagDvwOLJFQghUN",
      fields: {
        Link: "www.examplelink.com",
        Name: "Pixellated rug",
        Settings: ["Living room"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Cream", "Black", "Red"],
        Type: "Rugs",
        Orders: ["reccqEBrLMWz1ib2X"],
        Images: [
          {
            id: "attLIFOa7ce7a5nDd",
            width: 1125,
            height: 750,
            url: "https://dl.airtable.com/.attachments/58b0e273798c5feafccbb8fb4255640b/89289dc9/pexels-photo-1482177.jpegautocompresscstinysrgbh750w1260",
            filename: "pexels-photo-1482177.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            size: 133904,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/0ba817848422a4ec5222e4a2778ab36c/f30fee95",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/c1a730dc6083043b3a4fc95baca50468/e7c729b6",
                width: 768,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/a86dd6eb4340c2f9416570381c6f5f6c/cd3b8428",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Viscose", "Wool"],
        "Size (WxLxH)": "10x8x.25",
        "Unit cost": 2337.5,
        "Total units sold": 4,
        "Gross sales": 9350,
      },
      createdTime: "2014-09-24T05:48:20.000Z",
    },
    {
      id: "recbiEDrJOXHWfn4W",
      fields: {
        Notes: "Back in stock!",
        Link: "www.examplelink.com",
        Name: "Samari bookshelf",
        Settings: ["Living room"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Brown"],
        Designer: ["recubaiUEWwy7qlNj"],
        "In stock": true,
        Type: "Bookshelves",
        Orders: ["rec9nEwvUPVLRbgQL"],
        Images: [
          {
            id: "attzPYQlRQIaZC2gi",
            width: 1000,
            height: 664,
            url: "https://dl.airtable.com/.attachments/1d5da6ab7b5aaa85422470df41f4028f/41f6cfaf/photo-1543248939-4296e1fea89bixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9w1000q80",
            filename:
              "photo-1543248939-4296e1fea89b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            size: 118682,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/0bfc00bcc317b91ede93541ac9992c6e/e2d95a38",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/7a3b89cd44914b9db86eb00357471871/e66c4135",
                width: 771,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/5bea028b2b1ffaa3f810d733ce86eea8/07c4361c",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Light wood"],
        "Size (WxLxH)": "12x7x8",
        "Unit cost": 3585,
        "Total units sold": 5,
        "Gross sales": 17925,
      },
      createdTime: "2014-09-26T00:32:12.000Z",
    },
    {
      id: "recdjJvoUWPJ04jZS",
      fields: {
        Link: "www.examplelink.com",
        Name: "Kelly Sall light",
        Settings: ["Dining"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Gold", "Black"],
        Designer: ["receHjd3RuI4pwWPv"],
        Type: "Lighting",
        Orders: ["rec3eJzCPHKDUfmYU", "rec1kMDDULQEV4mUJ"],
        Images: [
          {
            id: "att6wJT4f86PPXO6E",
            width: 1000,
            height: 1500,
            url: "https://dl.airtable.com/.attachments/4ef0810bf457ccd389d36d4a4a25eddc/d3d18b97/photo-1540932239986-30128078f3c5ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1540932239986-30128078f3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 96926,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/3995075be79779ea6f3a4631dfa190ca/afe905b5",
                width: 24,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/17c8a69cac3a5cb225a63d20035083dd/473a3e62",
                width: 512,
                height: 768,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/79c7e3a08f88fbc5ac1f39a3796544f8/4d6314d5",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Brass", "Iron"],
        "Size (WxLxH)": "3x1x5",
        "Unit cost": 1950,
        "Total units sold": 10,
        "Gross sales": 19500,
      },
      createdTime: "2014-09-26T01:46:24.000Z",
    },
    {
      id: "recesbIYWDz7gzmUa",
      fields: {
        Link: "www.examplelink.com",
        Name: "Traverse coffee table",
        Settings: ["Living room"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Brown"],
        Designer: ["recCOx3aLV4dtIwj0"],
        "In stock": true,
        Type: "Tables",
        Images: [
          {
            id: "attvvjid4qZ61YIXs",
            width: 1000,
            height: 714,
            url: "https://dl.airtable.com/.attachments/cf130facf9882661f456094d55c719a2/5f8c90cd/photo-1461418126083-a84e9ca935deixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1461418126083-a84e9ca935de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 73526,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/a5fa7521c04a36874d88e88422201a84/fd3b2287",
                width: 50,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/54cce4443242a9ae655f66efd769c005/ae0835e2",
                width: 717,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/3d54e0b5ce4f23ca9103f2536969365e/b9fe715f",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Reclaimed wood"],
        "Size (WxLxH)": "31.5x31.5x13.75",
        "Unit cost": 756.5,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T20:59:52.000Z",
    },
    {
      id: "rech1fci5RLv5Wuya",
      fields: {
        Link: "www.examplelink.com",
        Name: "Zig-zag rug",
        Settings: ["Bedroom"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Black", "White"],
        "In stock": true,
        Type: "Rugs",
        Images: [
          {
            id: "attKBGaNSHgD2Dsj1",
            width: 1000,
            height: 1500,
            url: "https://dl.airtable.com/.attachments/f026e3efd17cba2d1b9edfb73cd1d955/deb749bf/photo-1557374669-d1f478dc92c4ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1557374669-d1f478dc92c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 292705,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/b5b74dc7f3b9151307872724ebe2fcff/e0aacacb",
                width: 24,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/8e5d586083fce3b396b7e5e3b01dc2b9/e85ac9cd",
                width: 512,
                height: 768,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/5586d8013a092653199b89ec519d1cf1/9da8ed3b",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Wool", "Viscose"],
        "Size (WxLxH)": "8x10 and 10x12",
        "Unit cost": 2337.5,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T19:55:16.000Z",
    },
    {
      id: "recilWUjuW32MFFQJ",
      fields: {
        Link: "www.examplelink.com",
        Name: "Phona Shanta rug",
        Settings: ["Bedroom"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Red", "Blue", "Cream", "Cherry"],
        "In stock": true,
        Type: "Rugs",
        Images: [
          {
            id: "attwZEARu38xurYIs",
            width: 1000,
            height: 1250,
            url: "https://dl.airtable.com/.attachments/17caf0be597b8296abe24165e6681b29/6309048f/photo-1534889156217-d643df14f14aixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1534889156217-d643df14f14a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 257324,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/4bbd5a66971e35be391f56051ba69fcb/3bbd612d",
                width: 29,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/ab1950ddc22f4c330401dcc96aead0a0/66cc844e",
                width: 512,
                height: 640,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/297cc3d71aaa87689824b8d40c6775e1/4e91d8cf",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Wool", "Cotton"],
        "Size (WxLxH)": "6'x9' and 9'x12'",
        "Unit cost": 680,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T21:21:16.000Z",
    },
    {
      id: "recmXaFhfBq0UW8JG",
      fields: {
        Link: "www.examplelink.com",
        Name: "Dual extension table",
        Settings: ["Living room", "Office"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Beige", "Brown", "White"],
        Designer: ["recwetAjjaWP4PP4p"],
        Type: "Tables",
        Images: [
          {
            id: "attPLeBxjQ5P7S6U5",
            width: 1000,
            height: 667,
            url: "https://dl.airtable.com/.attachments/8a16fbbdf733eba3729525ff3ce086a6/c4e24bed/photo-1530018607912-eff2daa1bac4ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1530018607912-eff2daa1bac4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 56969,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/6091124e504b31a786d6fb0ef7f5086f/a6f865a9",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/7cc91cfd43bdcefabfaef6dfb2dc29ae/2b4205f3",
                width: 768,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/6ca4493666279439287f1475e9730e46/3efda09c",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Dark wood", "Light wood"],
        "Size (WxLxH)": "35.5x29.5",
        "Unit cost": 4350,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T19:42:25.000Z",
    },
    {
      id: "recqatIR3nDJE8SDV",
      fields: {
        Link: "www.examplelink.com",
        Name: "Rectangular sofa in Blue moon",
        Settings: ["Living room", "Office"],
        Vendor: ["reczC9ifQTdJpMZcx"],
        Color: ["Blue"],
        Designer: ["recmAQKRCCi4Dz6RR"],
        "In stock": true,
        Type: "Sofas",
        Orders: ["recbOpgZRIhi86RnT"],
        Images: [
          {
            id: "att6mjGjkzKCvrTzj",
            width: 1090,
            height: 750,
            url: "https://dl.airtable.com/.attachments/7de357d61da52a8356c51336f991ab99/99188c97/pexels-photo-1282315.jpegautocompresscstinysrgbh750w1260",
            filename: "pexels-photo-1282315.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            size: 51195,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/d0bb425a528119db9ab133547b4e15d2/58c5973e",
                width: 52,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/1c251b6fd8143b92167b9d66b353039c/07650c41",
                width: 744,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/38c75f6bfacb1e30d1775ac3722e39c5/2c3f66ca",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Suede"],
        "Size (WxLxH)": "80x25.5",
        "Unit cost": 3782.5,
        "Total units sold": 1,
        "Gross sales": 3782.5,
      },
      createdTime: "2015-01-27T20:56:53.000Z",
    },
    {
      id: "recqkdaSiie4njMmh",
      fields: {
        Link: "www.examplelink.com",
        Name: "Gedo bench",
        Settings: ["Office"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Brown"],
        Designer: ["recBcfJfq81I96sb9"],
        "In stock": true,
        Type: "Chairs",
        Images: [
          {
            id: "attm4rKaRc3O4JGr0",
            width: 1000,
            height: 669,
            url: "https://dl.airtable.com/.attachments/263a1a01bdf60843283fac826f816bef/6dd81037/photo-1499364781141-6f7bf8bbc8dbixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1499364781141-6f7bf8bbc8db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 149965,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/9b91221f7eefea7581b03aef1966c1c5/7da10685",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/17a9bd2c19aefc0f5ce12d98d17a7828/88d56a53",
                width: 765,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/69e726d86a4d3ef69ee08704b00b1397/9fc65774",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Reclaimed wood"],
        "Size (WxLxH)": "16.5x60x18",
        "Unit cost": 1575,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T20:15:28.000Z",
    },
    {
      id: "rectIFJB1ao5OHLf0",
      fields: {
        Link: "www.examplelink.com",
        Name: "Dita side table",
        Settings: ["Office", "Bedroom"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["White", "Brown"],
        "In stock": true,
        Type: "Tables",
        Images: [
          {
            id: "attw1WlLKTAd2HZLo",
            width: 1000,
            height: 1333,
            url: "https://dl.airtable.com/.attachments/a7940e6d1f94256db11b1e17b513390a/c8b51347/photo-1499933374294-4584851497ccixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
            filename:
              "photo-1499933374294-4584851497cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
            size: 196649,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/6fb995acfec3a8dd6785346e62218edb/11181100",
                width: 27,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/d3e8499b961622820704d1dcb8e3ab6a/35246ba7",
                width: 512,
                height: 682,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/98fc6bf2ae5c6c27e670d16676c98445/122852cc",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Solid teak", "Light wood"],
        "Size (WxLxH)": '16.75"Wx16.5"Dx22.75"H',
        "Unit cost": 349,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T21:26:38.000Z",
    },
    {
      id: "recx5eatp5eIb9wb1",
      fields: {
        Link: "www.examplelink.com",
        Name: "Cow rug",
        Settings: ["Bedroom", "Office", "Living room"],
        Vendor: ["rec2nan8zh3q75IlN"],
        Color: ["Black", "White", "Brown"],
        "In stock": true,
        Type: "Rugs",
        Images: [
          {
            id: "attrXc2yciDEY8ek3",
            width: 1000,
            height: 667,
            url: "https://dl.airtable.com/.attachments/652bd4d06d588d20203aa83641a10c8e/7f3d1b12/photo-1499955085172-a104c9463eceixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9w1000q80",
            filename:
              "photo-1499955085172-a104c9463ece?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
            size: 105083,
            type: "image/jpeg",
            thumbnails: {
              small: {
                url: "https://dl.airtable.com/.attachmentThumbnails/7bc190fcd4e767bd00ade81e04d9827b/8472d701",
                width: 54,
                height: 36,
              },
              large: {
                url: "https://dl.airtable.com/.attachmentThumbnails/20b8118b8c14da02364082ff97bbc1af/d948c8e3",
                width: 768,
                height: 512,
              },
              full: {
                url: "https://dl.airtable.com/.attachmentThumbnails/c4114e48121f78623e5f98b5bd305d89/973b9fec",
                width: 3000,
                height: 3000,
              },
            },
          },
        ],
        Description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        Materials: ["Leather cowhide"],
        "Size (WxLxH)": "4'9\"x5'10\"",
        "Unit cost": 2008.55,
        "Total units sold": 0,
        "Gross sales": 0,
      },
      createdTime: "2015-01-27T21:21:15.000Z",
    },
  ],
};

const searcher = new JSONHeroSearch(json, { cacheSettings: { enabled: false } });
searcher.prepareIndex();

for (let i = 0; i < 100; i++) {
  searcher.search("url");
}
