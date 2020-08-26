import { rest } from "msw";

const characters = [
  {
    name: "Eddard Stark",
    actor: "Sean Bean",
    house: "House Stark",
    alive: false,
    image: "/tests/Eddard_Stark.jpg",
  },
  {
    name: "Sansa Stark",
    actor: "Sophie Turner",
    house: "House Stark",
    alive: true,
    image: "/tests/Catelyn.jpg",
  },
];

export const handlers = [
  // or https://api.got.show/api/show/characters
  rest.get("*/show/characters", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characters));
  }),
];
