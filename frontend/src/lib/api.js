import { URL } from "../config/inv"


export function getStrapiURL(path = "") {
  return `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || URL
  }${path}`
}