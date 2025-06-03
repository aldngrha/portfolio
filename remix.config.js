/** @type {import('@remix-run/dev').AppConfig} */
export default {
  tailwind: true,
  postcss: true,
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildDirectory: "build",
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverBuildTarget: "cloudflare-pages",
}
