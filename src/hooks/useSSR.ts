// NOTE: this is a copy of the original useSSR.ts file from use-ssr https://github.com/iamthesiz/use-ssr/blob/master/useSSR.ts
// NOTE: due to the original use-ssr no longer being maintained, the react v19 update has caused the library to become imcompatible with the project due to peer dependency conflicts
interface UseSSRReturn {
  isBrowser: boolean;
  isServer: boolean;
  device: Device;
  canUseWorkers: boolean;
  canUseEventListeners: boolean;
  canUseViewport: boolean;
}

export enum Device {
  Browser = "browser",
  Server = "server",
}

const { Browser, Server } = Device;

const canUseDOM: boolean = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const device = canUseDOM ? Browser : Server;

const SSRObject = {
  isBrowser: device === Browser,
  isServer: device === Server,
  device,
  canUseWorkers: typeof Worker !== "undefined",
  canUseEventListeners: device === Browser && !!window.addEventListener,
  canUseViewport: device === Browser && !!window.screen,
};

const assign = <T extends Record<string, unknown>>(...args: T[]): T =>
  args.reduce((acc, obj) => ({ ...acc, ...obj }), {} as T);
const values = <T extends Record<string, unknown>>(obj: T): unknown[] =>
  Object.keys(obj).map((key) => obj[key]);
const toArrayObject = (): UseSSRReturn =>
  assign((values(SSRObject), SSRObject));

let useSSRObject = toArrayObject();

export const weAreServer = () => {
  SSRObject.isServer = true;
  useSSRObject = toArrayObject();
};

export const useSSR = (): UseSSRReturn => useSSRObject;
