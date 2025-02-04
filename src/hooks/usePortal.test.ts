import { renderHook, act } from "@testing-library/react";
import { usePortal, errorMessage1 } from "./usePortal";

jest.mock("./useSSR", () => ({
  useSSR: jest.fn(() => ({ isServer: false, isBrowser: true })),
}));

describe("usePortal", () => {
  it("should not be open", () => {
    const { result } = renderHook(() => usePortal());
    const { isOpen } = result.current;
    expect(isOpen).toBe(false);
  });

  it("should error if no event is passed and no ref is set", () => {
    const { result } = renderHook(() => usePortal());
    try {
      result.current.openPortal();
    } catch (err) {
      expect(err.message).toBe(errorMessage1);
    }
  });

  it("does not error if programmatically opening the portal", () => {
    const { result } = renderHook(() =>
      usePortal({ programmaticallyOpen: true }),
    );
    act(() => {
      expect(result.current.openPortal).not.toThrow();
    });
  });

  it("should open portal when openPortal is called", () => {
    const { result } = renderHook(() =>
      usePortal({ programmaticallyOpen: true }),
    );
    act(() => {
      result.current.openPortal();
    });
    expect(result.current.isOpen).toBe(true);
  });

  it("should close portal when closePortal is called", () => {
    const { result } = renderHook(() => usePortal({ isOpen: true }));
    act(() => {
      result.current.closePortal();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should toggle portal state when togglePortal is called", () => {
    const { result } = renderHook(() =>
      usePortal({ programmaticallyOpen: true }),
    );
    act(() => {
      result.current.togglePortal();
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.togglePortal();
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should throw error when openPortal is called without event and programmaticallyOpen is false", () => {
    const { result } = renderHook(() =>
      usePortal({ programmaticallyOpen: false }),
    );
    expect(() => {
      act(() => {
        result.current.openPortal();
      });
    }).toThrow(errorMessage1);
  });

  it("should call onOpen callback when portal is opened", () => {
    const onOpen = jest.fn();
    const { result } = renderHook(() =>
      usePortal({ onOpen, programmaticallyOpen: true }),
    );
    act(() => {
      result.current.openPortal();
    });
    expect(onOpen).toHaveBeenCalled();
  });

  it("should call onClose callback when portal is closed", () => {
    const onClose = jest.fn();
    const { result } = renderHook(() => usePortal({ isOpen: true, onClose }));
    act(() => {
      result.current.closePortal();
    });
    expect(onClose).toHaveBeenCalled();
  });

  it("should close portal when Escape key is pressed", () => {
    const { result } = renderHook(() => usePortal({ isOpen: true }));
    act(() => {
      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("should close portal when clicking outside", () => {
    const { result } = renderHook(() => usePortal({ isOpen: true }));
    act(() => {
      const event = new MouseEvent("mousedown", { bubbles: true });
      document.body.dispatchEvent(event);
    });
    expect(result.current.isOpen).toBe(false);
  });
});
