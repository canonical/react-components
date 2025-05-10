import classNames from "classnames";
import type { HTMLProps } from "react";
import React from "react";

import type { ClassName, PropsWithSpread, ValueOf } from "types";

export const STANDARD_ICONS = {
  anchor: "anchor",
  chevronDown: "chevron-down",
  chevronLeft: "chevron-left",
  chevronRight: "chevron-right",
  chevronUp: "chevron-up",
  close: "close",
  code: "code",
  collapse: "collapse",
  copy: "copy",
  delete: "delete",
  drag: "drag",
  errorGrey: "error-grey",
  expand: "expand",
  externalLink: "external-link",
  help: "help",
  hide: "hide",
  menu: "menu",
  minus: "minus",
  plus: "plus",
  search: "search",
  share: "share",
  show: "show",
  spinner: "spinner",
  successGrey: "success-grey",
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
  priorityCritical: "priority-critical",
  priorityHigh: "priority-high",
  priorityLow: "priority-low",
  priorityMedium: "priority-medium",
  priorityNegligible: "priority-negligible",
  priorityUnknown: "priority-unknown",
  addCanvas: "add-canvas",
  addLogicalVolume: "add-logical-volume",
  addPartition: "add-partition",
  backToTop: "back-to-top",
  beginDownloading: "begin-downloading",
  bundle: "bundle",
  canvas: "canvas",
  changeVersion: "change-version",
  comments: "comments",
  conflictGrey: "conflict-grey",
  conflictResolutionGrey: "conflict-resolution-grey",
  conflictResolution: "conflict-resolution",
  conflict: "conflict",
  connected: "connected",
  containers: "containers",
  copyToClipboard: "copy-to-clipboard",
  desktop: "desktop",
  disconnect: "disconnect",
  edit: "edit",
  export: "export",
  exposed: "exposed",
  filter: "filter",
  fork: "fork",
  getLink: "get-link",
  halfscreenBar: "halfscreen-bar",
  highlightOff: "highlight-off",
  highlightOn: "highlight-on",
  home: "home",
  import: "import",
  inProgress: "in-progress",
  inspectorDebug: "inspector-debug",
  loadingSteps: "loading-steps",
  lockLockedActive: "lock-locked-active",
  lockLocked: "lock-locked",
  lockUnlock: "lock-unlock",
  maximiseBar: "maximise-bar",
  minimiseBar: "minimise-bar",
  mount2: "mount-2",
  mount: "mount",
  openTerminal: "open-terminal",
  pause: "pause",
  plans: "plans",
  play: "play",
  pods: "pods",
  powerError: "power-error",
  powerOff: "power-off",
  powerOn: "power-on",
  profile: "profile",
  restart: "restart",
  revisions: "revisions",
  security: "security",
  settings: "settings",
  sortBoth: "sort-both",
  sortDown: "sort-down",
  sortUp: "sort-up",
  starred: "starred",
  statusFailedSmall: "status-failed-small",
  statusInProgressSmall: "status-in-progress-small",
  statusInProgress: "status-in-progress",
  statusQueuedSmall: "status-queued-small",
  statusQueued: "status-queued",
  statusSucceededSmall: "status-succeeded-small",
  statusWaitingSmall: "status-waiting-small",
  statusWaiting: "status-waiting",
  status: "status",
  stop: "stop",
  submitBug: "submit-bug",
  switcherDashboard: "switcher-dashboard",
  switcherEnvironments: "switcher-environments",
  switcher: "switcher",
  tag: "tag",
  taskOutstanding: "task-outstanding",
  timedOutGrey: "timed-out-grey",
  timedOut: "timed-out",
  topic: "topic",
  unitPending: "unit-pending",
  unitRunning: "unit-running",
  unmount: "unmount",
  unstarred: "unstarred",
  userGroup: "user-group",
  videoPlay: "video-play",
  warningGrey: "warning-grey",
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
  ...STANDARD_ICONS,
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
const Icon = ({
  className,
  light,
  name,
  ...props
}: Props): React.JSX.Element => (
  <i
    className={classNames(className, `p-icon--${name}`, {
      "is-light": light,
    })}
    {...props}
  />
);

export default Icon;
