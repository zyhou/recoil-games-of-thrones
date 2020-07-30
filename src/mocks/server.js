import { rest } from "msw";
import { setupServer } from "msw/node";

const characters = [
  {
    name: "Eddard Stark",
    actor: "Sean Bean",
    house: "House Stark",
    alive: false,
    image: "https://eddard-images.com",
  },
  {
    name: "Sansa Stark",
    actor: "Sophie Turner",
    house: "House Stark",
    alive: true,
    image: "https://sansa-images.com",
  },
];

const handlers = [
  // or https://api.got.show/api/show/characters
  rest.get("*/show/characters", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characters));
  }),
];

// This configures a request mocking server with the given request handlers.
export const server = setupServer(...handlers);
