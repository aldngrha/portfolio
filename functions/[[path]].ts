// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import * as build from "../build/server/index.js";
import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

const handleRequest = createPagesFunctionHandler({ build });

export const onRequest = handleRequest;
