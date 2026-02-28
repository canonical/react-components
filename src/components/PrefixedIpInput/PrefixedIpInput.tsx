import React, { type ClipboardEvent, type ReactElement } from "react";
import PrefixedInput, { type PrefixedInputProps } from "../PrefixedInput";
import { getImmutableAndEditable, isIPv4 } from "./utils";
import { PropsWithSpread } from "types";

export type PrefixedIpInputProps = PropsWithSpread<
  {
    /**
     * The CIDR for the subnet (e.g., "192.168.1.0/24" or "2001:db8::/32").
     * Used to calculate the immutable prefix and available IP range.
     */
    cidr: string;
    /**
     * The full IP address value (if available).
     * For IPv4: e.g., "192.168.1.100"
     * For IPv6: e.g., "2001:db8::1"
     */
    ip: string;
    /**
     * The name attribute for the input field.
     */
    name: string;
    /**
     * Callback function that is called when the IP address changes.
     * Receives the full IP address as a string parameter.
     */
    onIpChange: (ip: string) => void;
  },
  Omit<
    PrefixedInputProps,
    "immutableText" | "maxLength" | "placeholder" | "name"
  >
>;
const PrefixedIpInput = ({
  cidr,
  help,
  onIpChange,
  ip,
  name,
  ...props
}: PrefixedIpInputProps): ReactElement => {
  const [networkAddress] = cidr.split("/");
  const isIPV4 = isIPv4(networkAddress);
  const [immutable, editable] = getImmutableAndEditable(cidr);
  const inputValue = isIPV4
    ? ip.split(".").slice(immutable.split(".").length).join(".")
    : ip.replace(immutable, "");
  const getIPv4MaxLength = () => {
    const immutableOctetsLength = immutable.split(".").length;
    const lengths = [15, 11, 7, 3]; // Corresponding to 0-3 immutable octets
    return lengths[immutableOctetsLength];
  };
  const maxLength = isIPV4 ? getIPv4MaxLength() : editable.length;
  const placeholder = props.disabled ? "" : editable;

  const setIp = (editableValue: string) => {
    const fullIp = editableValue
      ? isIPV4
        ? `${immutable}.${editableValue}`
        : `${immutable}${editableValue}`
      : "";
    onIpChange(fullIp);
  };
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    if (isIPV4) {
      const octets = pastedText.split(".");
      const trimmed = octets.slice(0 - editable.split(".").length);
      const ip = trimmed.join(".");
      setIp(ip);
    } else {
      const ip = pastedText.replace(immutable, "");
      setIp(ip);
    }
  };
  return (
    <PrefixedInput
      help={
        help ? (
          help
        ) : (
          <>
            {" "}
            {isIPV4 ? (
              <>
                {" "}
                The available range in this subnet is{" "}
                <code>
                  {immutable}.{editable}{" "}
                </code>
              </>
            ) : (
              <>
                {" "}
                The available IPV6 address range is{" "}
                <code>
                  {immutable}
                  {editable}{" "}
                </code>
              </>
            )}
            .
          </>
        )
      }
      immutableText={isIPV4 ? `${immutable}.` : immutable}
      maxLength={maxLength}
      name={name}
      onPaste={handlePaste}
      value={inputValue}
      onChange={(e) => {
        setIp(e.target.value);
      }}
      placeholder={placeholder}
      {...props}
    />
  );
};
export default PrefixedIpInput;
