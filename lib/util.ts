// Make an object serializable to JSON.
//
// Useful to convert an object which may contain non-serializeable data such as
// Dates to an object that doesn't
export function makeSerializable<T extends any> (o: T): T {
  return JSON.parse(JSON.stringify(o))
}                                                                       

export type Cookie = {
  auth: string
}

export function parseCookie(str): Cookie {
  return str
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
}
  