/**
 * Checks if a given IP address is a valid IPv4 address.
 * @param ip The IP address to check
 * @returns True if the IP is a valid IPv4 address, false otherwise
 */
export const isIPv4 = (ip: string) => {
  const ipv4Regex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

  return ipv4Regex.test(ip);
};

/**
 * Takes a subnet CIDR notation (IPv4) and returns the first and last IP of the subnet.
 * The network and host addresses are excluded.
 *
 * @param cidr The CIDR notation of the subnet
 * @returns The first and last valid IP addresses as two strings in a list.
 */
export const getIpRangeFromCidr = (cidr: string): string[] => {
  // https://gist.github.com/binarymax/6114792

  // Get start IP and number of valid addresses
  const [unmaskedStartIp, mask] = cidr.split("/");
  const maskBits = parseInt(mask, 10);
  const subnetMask = maskBits === 0 ? 0 : (0xffffffff << (32 - maskBits)) >>> 0;
  const startIp = convertUint32ToIp(
    convertIpToUint32(unmaskedStartIp) & subnetMask,
  );
  const numberOfAddresses = (1 << (32 - maskBits)) - 1;

  // IPv4 can be represented by an unsigned 32-bit integer, so we can use a Uint32Array to store the IP
  const buffer = new ArrayBuffer(4); //4 octets
  const int32 = new Uint32Array(buffer);

  // Convert starting IP to Uint32 and add the number of addresses to get the end IP.
  // Subtract 1 from the number of addresses to exclude the broadcast address.
  int32[0] = convertIpToUint32(startIp) + numberOfAddresses - 1;

  // Convert the buffer to a Uint8Array to get the octets, then convert it to an array
  const arrayApplyBuffer = Array.from(new Uint8Array(buffer));

  // Reverse the octets and join them with "." to get the end IP
  const endIp = arrayApplyBuffer.reverse().join(".");

  const firstValidIp = getFirstValidIp(startIp);

  return [firstValidIp, endIp];
};

export const getFirstValidIp = (ip: string) => {
  const buffer = new ArrayBuffer(4); //4 octets
  const int32 = new Uint32Array(buffer);

  // add 1 because the first IP is the network address
  int32[0] = convertIpToUint32(ip) + 1;

  const arrayApplyBuffer = Array.from(new Uint8Array(buffer));

  return arrayApplyBuffer.reverse().join(".");
};

export const convertIpToUint32 = (ip: string) => {
  const octets = ip.split(".").map((a) => parseInt(a));
  const buffer = new ArrayBuffer(4);
  const int32 = new Uint32Array(buffer);
  int32[0] =
    (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
  return int32[0];
};

export const convertUint32ToIp = (ipAsUint32: number) => {
  const buffer = new ArrayBuffer(4); //4 octets
  const int32 = new Uint32Array(buffer);
  int32[0] = ipAsUint32;
  const octets = Array.from(new Uint8Array(buffer));
  return octets.reverse().join(".");
};

/**
 * Checks if an IPv4 address is valid for the given subnet.
 *
 * @param ip The IPv4 address to check, as a string
 * @param cidr The subnet's CIDR notation e.g. 192.168.0.0/24
 * @returns True if the IP is in the subnet, false otherwise
 */
export const isIpInSubnet = (ip: string, cidr: string): boolean => {
  const [startIP, endIP] = getIpRangeFromCidr(cidr);

  const ipUint32 = convertIpToUint32(ip);
  const startIPUint32 = convertIpToUint32(startIP);
  const endIPUint32 = convertIpToUint32(endIP);

  return ipUint32 >= startIPUint32 && ipUint32 <= endIPUint32;
};

/**
 * Separates the immutable and editable octets of an IPv4 subnet range.
 *
 * @param startIp The start IP of the subnet
 * @param endIp The end IP of the subnet
 * @returns The immutable and editable octects as two strings in a list
 */
export const getImmutableAndEditableOctets = (
  startIp: string,
  endIp: string,
): string[] => {
  const startIpOctetList = startIp.split(".");
  const endIpOctetList = endIp.split(".");

  const immutable: string[] = [];
  const editable: string[] = [];

  startIpOctetList.forEach((octet, index) => {
    if (octet === endIpOctetList[index]) {
      immutable.push(octet);
    } else {
      editable.push(`[${octet}-${endIpOctetList[index]}]`);
    }
  });

  return [immutable.join("."), editable.join(".")];
};

/**
 * Separates the immutable and editable parts of an IPv6 subnet range.
 * For simplcity, if the prefix is not on a group boundary, the entire last group is considered editable.
 *
 * @param cidr The CIDR notation of the subnet
 * @returns The immutable and editable parts as two strings in a list
 */
export const getImmutableAndEditableIPv6 = (cidr: string): string[] => {
  const [address, prefix] = cidr.split("/");
  const prefixLength = parseInt(prefix, 10);

  const [left = "", right = ""] = address.split("::");
  const leftGroups = left ? left.split(":").filter(Boolean) : [];
  const rightGroups = right ? right.split(":").filter(Boolean) : [];
  const missingGroups = Math.max(
    0,
    8 - (leftGroups.length + rightGroups.length),
  );

  const expandedGroups: string[] = [
    ...leftGroups,
    ...Array(missingGroups).fill("0"),
    ...Array(rightGroups.length).fill("0"),
  ];

  const immutableGroupCount = Math.floor(prefixLength / 16);
  let immutableIPV6 =
    immutableGroupCount > 0
      ? `${expandedGroups.slice(0, immutableGroupCount).join(":")}`
      : "";
  if (immutableGroupCount < 8) {
    immutableIPV6 += immutableIPV6 ? ":" : "";
  }
  const editableIPV6 = `${expandedGroups.slice(immutableGroupCount).join(":")}`;
  return [immutableIPV6, editableIPV6];
};

/**
 * Get the immutable and editable parts of an IPv4 or IPv6 subnet.
 *
 * @param cidr The CIDR notation of the subnet
 * @returns The immutable and editable as two strings in a list
 */
export const getImmutableAndEditable = (cidr: string) => {
  const isIPV4 = isIPv4(cidr.split("/")[0]);
  if (isIPV4) {
    const [startIp, endIp] = getIpRangeFromCidr(cidr);
    return getImmutableAndEditableOctets(startIp, endIp);
  }
  return getImmutableAndEditableIPv6(cidr);
};
