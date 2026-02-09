/**
 * This is a reference implementation of the useSSR hook from use-ssr: https://github.com/iamthesiz/use-ssr/blob/master/useSSR.ts
 * The license for the content in this file is goverened by the original project's license: https://github.com/iamthesiz/use-ssr/blob/master/license.md
 */
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
