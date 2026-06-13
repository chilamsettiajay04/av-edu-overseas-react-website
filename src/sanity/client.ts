import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "328sgac3",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});
