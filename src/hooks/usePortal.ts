// NOTE: this is a copy of the original usePortal.ts file from react-useportal https://github.com/iamthesiz/react-useportal/blob/master/usePortal.ts
// NOTE: due to the original react-useportal no longer being maintained, the react v19 update has caused the library to become imcompatible with the project
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
  SyntheticEvent,
  RefObject,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useSSR } from "./useSSR";

type CustomEvent<T = HTMLElement> = {
  event?: SyntheticEvent<T, Event>;
  portal: RefObject<HTMLElement>;
  targetEl: RefObject<HTMLElement>;
} & SyntheticEvent<T, Event>;

type CustomEventHandler<T = HTMLElement> = (
  customEvent: CustomEvent<T>,
) => void;

export type UsePortalOptions = {
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  bindTo?: HTMLElement; // attach the portal to this node in the DOM
  isOpen?: boolean;
  onOpen?: CustomEventHandler;
  onClose?: CustomEventHandler;
  onPortalClick?: CustomEventHandler;
  programmaticallyOpen?: boolean;
};

export const errorMessage1 =
  "You must either add a `ref` to the element you are interacting with or pass an `event` to openPortal(e) or togglePortal(e) when the `programmaticallyOpen` option is not set to `true`.";

export const usePortal = ({
  closeOnOutsideClick = true,
  closeOnEsc = true,
  bindTo, // attach the portal to this node in the DOM
  isOpen: defaultIsOpen = false,
  onOpen,
  onClose,
  onPortalClick,
  programmaticallyOpen = false,
}: UsePortalOptions = {}) => {
  const { isServer, isBrowser } = useSSR();
  const [isOpen, makeOpen] = useState(defaultIsOpen);
  // we use this ref because `isOpen` is stale for handleOutsideMouseClick
  const open = useRef(isOpen);

  const setOpen = useCallback((v: boolean) => {
    // workaround to not have stale `isOpen` in the handleOutsideMouseClick
    open.current = v;
    makeOpen(v);
  }, []);

  const targetEl = useRef<HTMLElement>(null); // this is the element you are clicking/hovering/whatever, to trigger opening the portal
  const portal = useRef<HTMLElement>(
    isBrowser ? document.createElement("div") : null,
  );

  useEffect(() => {
    if (isBrowser && !portal.current)
      portal.current = document.createElement("div");
  }, [isBrowser, portal]);

  const elToMountTo = useMemo(() => {
    if (isServer) return null;
    return bindTo || document.body;
  }, [isServer, bindTo]);

  const createCustomEvent = (e?: SyntheticEvent<HTMLElement, Event>) => {
    if (!e) return { portal, targetEl, event: e } as CustomEvent;
    const event = (e || {}) as CustomEvent;
    if (event.persist) event.persist();
    event.portal = portal;
    event.targetEl = targetEl;
    event.event = e;
    const { currentTarget } = e;
    if (
      !targetEl.current &&
      currentTarget &&
      currentTarget !== (document as unknown as Node)
    )
      targetEl.current = event.currentTarget;
    return event;
  };

  const openPortal = useCallback(
    (e?: SyntheticEvent<HTMLElement, Event>) => {
      if (isServer) return;
      const customEvent = createCustomEvent(e);
      // for some reason, when we don't have the event argument, there
      // is a weird race condition. Would like to see if we can remove
      // setTimeout, but for now this works
      if (targetEl.current == null && !programmaticallyOpen) {
        setTimeout(() => setOpen(true), 0);
        throw Error(errorMessage1);
      }
      if (onOpen) onOpen(customEvent);
      setOpen(true);
    },
    [isServer, portal, setOpen, targetEl, onOpen, programmaticallyOpen],
  );

  const closePortal = useCallback(
    (e?: SyntheticEvent<HTMLElement, Event>) => {
      if (isServer) return;
      const customEvent = createCustomEvent(e);
      if (onClose && open.current) onClose(customEvent);
      if (open.current) setOpen(false);
    },
    [isServer, onClose, setOpen],
  );

  const togglePortal = useCallback(
    (e?: SyntheticEvent<HTMLElement, Event>): void =>
      open.current ? closePortal(e) : openPortal(e),
    [closePortal, openPortal],
  );

  const handleKeydown = useCallback(
    (e: KeyboardEvent): void =>
      e.key === "Escape" && closeOnEsc
        ? closePortal(e as unknown as SyntheticEvent<HTMLElement, Event>)
        : undefined,
    [closeOnEsc, closePortal],
  );

  const handleOutsideMouseClick = useCallback(
    (e: MouseEvent): void => {
      const containsTarget = (target: RefObject<HTMLElement>) =>
        target.current.contains(e.target as HTMLElement);
      // There might not be a targetEl if the portal was opened programmatically.
      if (
        containsTarget(portal) ||
        e.button !== 0 ||
        !open.current ||
        (targetEl.current && containsTarget(targetEl))
      )
        return;
      if (closeOnOutsideClick)
        closePortal(e as unknown as SyntheticEvent<HTMLElement, Event>);
    },
    [isServer, closePortal, closeOnOutsideClick, portal],
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent): void => {
      if (isServer || !(portal.current instanceof HTMLElement)) return;
      const customEvent = createCustomEvent(
        e as unknown as SyntheticEvent<HTMLElement, Event>,
      );
      if (
        portal.current.contains(customEvent.target as HTMLElement) &&
        onPortalClick
      )
        onPortalClick(customEvent);
      handleOutsideMouseClick(e);
    },
    [handleOutsideMouseClick, isServer],
  );

  useEffect(() => {
    if (isServer) return null;
    if (
      !(elToMountTo instanceof HTMLElement) ||
      !(portal.current instanceof HTMLElement)
    )
      return null;

    const node = portal.current;
    elToMountTo.appendChild(portal.current);

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener(
      "mousedown",
      handleMouseDown as unknown as EventListener,
    );

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener(
        "mousedown",
        handleMouseDown as unknown as EventListener,
      );
      elToMountTo.removeChild(node);
    };
  }, [isServer, handleOutsideMouseClick, handleKeydown, elToMountTo, portal]);

  const Portal = useCallback(
    ({ children }: { children: ReactNode }) => {
      if (portal.current != null) return createPortal(children, portal.current);
      return null;
    },
    [portal],
  );

  return Object.assign(
    [
      openPortal,
      closePortal,
      open.current,
      Portal,
      togglePortal,
      targetEl,
      portal,
    ],
    {
      isOpen: open.current,
      openPortal,
      ref: targetEl,
      closePortal,
      togglePortal,
      Portal,
      portalRef: portal,
      bind: {
        // used if you want to spread all html attributes onto the target element
        ref: targetEl,
      },
    },
  );
};
