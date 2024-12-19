import { type NextRequest } from "next/server";

import { verifyRoute } from "@/features/authentication/api/verify-route";

export async function GET(request: NextRequest) {
  return verifyRoute(request);
}
