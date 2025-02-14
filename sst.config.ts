/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "mb-app",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    const site = await import("./infra/frontend");
    await import("./infra/api");

    new sst.x.DevCommand("Studio", {
      link: [storage],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    return {
      Website: site.site.url,
    };
  },
});
