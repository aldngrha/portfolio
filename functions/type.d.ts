declare module "../build" {
  // Remix build export types bisa dianggap any biar TS gak error
  export const assets: any;
  export const entry: any;
  export const routes: any;
}
