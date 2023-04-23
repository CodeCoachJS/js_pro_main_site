const { createClient } = require("@supabase/supabase-js");

const data = [
  {
    node: {
      name: "main_course",
      url: "https://github.com/CodeCoachJS/main_course",
      description:
        "Homework and videos to understand the fundamentals and advanced concepts used in Javascript",
      updatedAt: "2022-07-05T23:16:21Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
  {
    node: {
      name: "react_fix_me",
      url: "https://github.com/CodeCoachJS/react_fix_me",
      description:
        "Deep dive into React by fixing this small app with a user table that can filter by name",
      updatedAt: "2022-09-06T22:53:45Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
  {
    node: {
      name: "node_express_starter",
      url: "https://github.com/CodeCoachJS/node_express_starter",
      description:
        "A simple CRUD app with tests to get you started with Node/Express and middleware",
      updatedAt: "2023-04-18T17:58:44Z",
      homepageUrl: "",
      isPrivate: false,
    },
  },
  {
    node: {
      name: "react_pro_form",
      url: "https://github.com/CodeCoachJS/react_pro_form",
      description:
        "Create a simple form with React to submit a user to a dummy API to learn how to handle events and local state in ReactJS",
      updatedAt: "2022-04-11T18:53:52Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_profile_cards",
      url: "https://github.com/CodeCoachJS/js_pro_profile_cards",
      description: "Add your profile card via PR to learn the basics of React",
      updatedAt: "2022-08-26T04:20:27Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
  {
    node: {
      name: "stock_app",
      url: "https://github.com/CodeCoachJS/stock_app",
      description:
        "Fix our broken stock app and make the tests pass! Medium-level difficulty",
      updatedAt: "2023-03-25T14:45:36Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
  {
    node: {
      name: "shopping_cart_with_redux",
      url: "https://github.com/CodeCoachJS/shopping_cart_with_redux",
      description:
        "Small e-com app to walk through the basics of Redux and writing tests using Redux",
      updatedAt: "2022-12-21T18:11:25Z",
      homepageUrl: "",
      isPrivate: false,
    },
  },
  {
    node: {
      name: "user_table_needs_tests",
      url: "https://github.com/CodeCoachJS/user_table_needs_tests",
      description:
        "Add tests using testing-library to meet the coverage threshold",
      updatedAt: "2022-10-17T19:32:01Z",
      homepageUrl: null,
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_e-com_with_typescript",
      url: "https://github.com/CodeCoachJS/js_pro_e-com_with_typescript",
      description:
        "A simple e-com UI with products built with typescript and CRA",
      updatedAt: "2023-03-25T14:44:41Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_webpack_intro",
      url: "https://github.com/CodeCoachJS/js_pro_webpack_intro",
      description:
        "Create-React-App with webpack exposed. Includes a bundle analyzer to inspect the output of the bundle and a small bug to fix.",
      updatedAt: "2022-05-10T14:50:38Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_unit_testing",
      url: "https://github.com/CodeCoachJS/js_pro_unit_testing",
      description: "Intro to unit testing with Jest",
      updatedAt: "2023-03-15T10:07:25Z",
      homepageUrl: null,
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_react_testing_intro",
      url: "https://github.com/CodeCoachJS/js_pro_react_testing_intro",
      description:
        "Introduction to react testing library and writing some basic tests",
      updatedAt: "2023-02-05T21:04:58Z",
      homepageUrl: null,
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_next_js_graphql",
      url: "https://github.com/CodeCoachJS/js_pro_next_js_graphql",
      description:
        "A simple nextjs app to fetch github user data. Tests included",
      updatedAt: "2023-03-30T17:00:23Z",
      homepageUrl: null,
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_refactor_me",
      url: "https://github.com/CodeCoachJS/js_pro_refactor_me",
      description: "an app that could use a little love and refactoring",
      updatedAt: "2022-09-02T18:32:26Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_npm_library",
      url: "https://github.com/CodeCoachJS/js_pro_npm_library",
      description: "Simple npm library to learn versioning and publishing",
      updatedAt: "2022-10-16T14:56:05Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: ".github",
      url: "https://github.com/CodeCoachJS/.github",
      description: "Welcome and Overview of Material",
      updatedAt: "2022-10-22T19:40:42Z",
      homepageUrl: null,
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_npm_front_end_app",
      url: "https://github.com/CodeCoachJS/js_pro_npm_front_end_app",
      description:
        "Front end app playground for using accompanying npm library challenge",
      updatedAt: "2022-10-29T14:20:53Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_kyle_simspon_app",
      url: "https://github.com/CodeCoachJS/js_pro_kyle_simspon_app",
      description: "Tinker on Kyle Simpson's App and add some functionality",
      updatedAt: "2022-11-02T17:10:09Z",
      homepageUrl: "https://YouPeriod.app",
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_custom_hooks",
      url: "https://github.com/CodeCoachJS/js_pro_custom_hooks",
      description: "Create a custom hook to fetch data and make tests pass",
      updatedAt: "2022-11-13T04:18:52Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_slow_ass_site",
      url: "https://github.com/CodeCoachJS/js_pro_slow_ass_site",
      description:
        "Learn about core web vitals and how to use Lighthouse to improve this site's speed",
      updatedAt: "2022-11-21T17:26:16Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_backend_timeseries_app",
      url: "https://github.com/CodeCoachJS/js_pro_backend_timeseries_app",
      description:
        "A nodejs app written with typescript that returns historical data",
      updatedAt: "2022-12-09T22:26:30Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_full_stack",
      url: "https://github.com/CodeCoachJS/js_pro_full_stack",
      description: "full stack app using remix to learn cypress testing (e2e)",
      updatedAt: "2023-02-10T16:30:24Z",
      homepageUrl: null,
      isPrivate: false,
    },
  },
  {
    node: {
      name: "main_course-1-dupe",
      url: "https://github.com/CodeCoachJS/main_course-1-dupe",
      description:
        "Homework and videos to understand the fundamentals and advanced concepts used in Javascript",
      updatedAt: "2022-07-05T23:16:21Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pro_websockets",
      url: "https://github.com/CodeCoachJS/js_pro_websockets",
      description: "use binance data stream to track crypto trades in realtime",
      updatedAt: "2023-02-25T17:15:51Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "node_express_starter-1",
      url: "https://github.com/CodeCoachJS/node_express_starter-1",
      description:
        "A simple CRUD app with tests to get you started with Node/Express and middleware",
      updatedAt: "2023-01-30T20:34:22Z",
      homepageUrl: "",
      isPrivate: false,
    },
  },
  {
    node: {
      name: "node_express_starter-2",
      url: "https://github.com/CodeCoachJS/node_express_starter-2",
      description:
        "A simple CRUD app with tests to get you started with Node/Express and middleware",
      updatedAt: "2023-01-30T20:34:22Z",
      homepageUrl: "",
      isPrivate: false,
    },
  },
  {
    node: {
      name: "js_pro_web_workers",
      url: "https://github.com/CodeCoachJS/js_pro_web_workers",
      description: null,
      updatedAt: "2023-03-30T20:58:30Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "js_pros_migrations",
      url: "https://github.com/CodeCoachJS/js_pros_migrations",
      description:
        "What happens an API changes the structure of the data and you need a uniform shape for your users? Uses Typescript, NextJS and Tailwind.",
      updatedAt: "2023-04-18T21:28:26Z",
      homepageUrl: null,
      isPrivate: true,
    },
  },
  {
    node: {
      name: "public-apis",
      url: "https://github.com/CodeCoachJS/public-apis",
      description: "A collective list of free APIs",
      updatedAt: "2023-04-19T11:53:01Z",
      homepageUrl: "http://public-apis.org",
      isPrivate: false,
    },
  },
  {
    node: {
      name: "main_course-1",
      url: "https://github.com/CodeCoachJS/main_course-1",
      description:
        "Homework and videos to understand the fundamentals and advanced concepts used in Javascript",
      updatedAt: "2023-04-23T15:39:04Z",
      homepageUrl: "",
      isPrivate: true,
    },
  },
];

// TODO: add your own supabase url and key
const supabaseUrl = "";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);

data.forEach((item) => {
  supabase
    .from("repos")
    .insert([
      {
        name: item.node.name,
        url: item.node.url,
        description: item.node.description,
        updated_at: item.node.updatedAt,
        isPrivate: item.node.isPrivate,
      },
    ])
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});
