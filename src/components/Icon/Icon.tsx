import classNames from "classnames";
import type { HTMLProps } from "react";
import React from "react";

import type { ClassName, PropsWithSpread, ValueOf } from "types";

export const STANDART_ICONS = {
  anchor: "anchor",
  "chevron-down": "chevron-down",
  "chevron-left": "chevron-left",
  "chevron-right": "chevron-right",
  "chevron-up": "chevron-up",
  close: "close",
  code: "code",
  collapse: "collapse",
  copy: "copy",
  delete: "delete",
  drag: "drag",
  "error-grey": "error-grey",
  expand: "expand",
  "external-link": "external-link",
  help: "help",
  hide: "hide",
  menu: "menu",
  minus: "minus",
  plus: "plus",
  search: "search",
  share: "share",
  show: "show",
  spinner: "spinner",
  "success-grey": "success-grey",
  user: "user",
} as const;

export const STATUS_ICONS = {
  error: "error",
  information: "information",
  success: "success",
  warning: "warning",
} as const;

export const ADDITIONAL_ICONS = {
  applications: "applications",
  controllers: "controllers",
  fullscreen: "fullscreen",
  models: "models",
  machines: "machines",
  pin: "pin",
  units: "units",
  "priority-critical": "priority-critical",
  "priority-high": "priority-high",
  "priority-low": "priority-low",
  "priority-medium": "priority-medium",
  "priority-negligible": "priority-negligible",
  "priority-unknown": "priority-unknown",
  "add-canvas": "add-canvas",
  "add-logical-volume": "add-logical-volume",
  "add-partition": "add-partition",
  "back-to-top": "back-to-top",
  "begin-downloading": "begin-downloading",
  bundle: "bundle",
  canvas: "canvas",
  "change-version": "change-version",
  comments: "comments",
  "conflict-grey": "conflict-grey",
  "conflict-resolution-grey": "conflict-resolution-grey",
  "conflict-resolution": "conflict-resolution",
  conflict: "conflict",
  connected: "connected",
  containers: "containers",
  "copy-to-clipboard": "copy-to-clipboard",
  desktop: "desktop",
  disconnect: "disconnect",
  edit: "edit",
  export: "export",
  exposed: "exposed",
  filter: "filter",
  fork: "fork",
  "get-link": "get-link",
  "halfscreen-bar": "halfscreen-bar",
  "highlight-off": "highlight-off",
  "highlight-on": "highlight-on",
  home: "home",
  import: "import",
  "in-progress": "in-progress",
  "inspector-debug": "inspector-debug",
  "loading-steps": "loading-steps",
  "lock-locked-active": "lock-locked-active",
  "lock-locked": "lock-locked",
  "lock-unlock": "lock-unlock",
  "maximise-bar": "maximise-bar",
  "minimise-bar": "minimise-bar",
  "mount-2": "mount-2",
  mount: "mount",
  "open-terminal": "open-terminal",
  pause: "pause",
  plans: "plans",
  play: "play",
  pods: "pods",
  "power-error": "power-error",
  "power-off": "power-off",
  "power-on": "power-on",
  profile: "profile",
  restart: "restart",
  revisions: "revisions",
  security: "security",
  settings: "settings",
  "sort-both": "sort-both",
  "sort-down": "sort-down",
  "sort-up": "sort-up",
  starred: "starred",
  "status-failed-small": "status-failed-small",
  "status-in-progress-small": "status-in-progress-small",
  "status-in-progress": "status-in-progress",
  "status-queued-small": "status-queued-small",
  "status-queued": "status-queued",
  "status-succeeded-small": "status-succeeded-small",
  "status-waiting-small": "status-waiting-small",
  "status-waiting": "status-waiting",
  status: "status",
  stop: "stop",
  "submit-bug": "submit-bug",
  "switcher-dashboard": "switcher-dashboard",
  "switcher-environments": "switcher-environments",
  switcher: "switcher",
  tag: "tag",
  "task-outstanding": "task-outstanding",
  "timed-out-grey": "timed-out-grey",
  "timed-out": "timed-out",
  topic: "topic",
  "unit-pending": "unit-pending",
  "unit-running": "unit-running",
  unmount: "unmount",
  unstarred: "unstarred",
  "user-group": "user-group",
  "video-play": "video-play",
  "warning-grey": "warning-grey",
} as const;

export const SOCIAL_ICONS = {
  email: "email",
  facebook: "facebook",
  github: "github",
  instagram: "instagram",
  linkedin: "linkedin",
  rss: "rss",
  twitter: "twitter",
  youtube: "youtube",
} as const;

export const ICONS = {
  ...STANDART_ICONS,
  ...STATUS_ICONS,
  ...ADDITIONAL_ICONS,
  ...SOCIAL_ICONS,
} as const;

export type Props = PropsWithSpread<
  {
    /**
     * Optional classes to add to the icon element.
     */
    className?: ClassName;
    /**
     * Whether to show the light variant of the icon.
     */
    light?: boolean;
    /**
     * The name of the icon.
     */
    name: ValueOf<typeof ICONS> | string;
  },
  HTMLProps<HTMLElement>
>;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Icon](https://docs.vanillaframework.io/patterns/icons/).
 *
 * Icons provide visual context and enhance usability.
 *
 * @param name One of built-in Vanilla icons or a name of a custom icon that follows `p-icon--{name}` convention.
 * @returns Icon
 */
const Icon = ({ className, light, name, ...props }: Props): JSX.Element => (
  <i
    className={classNames(className, `p-icon--${name}`, {
      "is-light": light,
    })}
    {...props}
  />
);

export default Icon;
