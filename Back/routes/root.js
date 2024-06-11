async function rootRoute(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return "Hello  from my API ! ";
  });
}

module.exports = rootRoute;
