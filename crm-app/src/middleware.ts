import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/",
    "/leads/:path*",
    "/pipeline/:path*",
    "/inventory/:path*",
    "/broadcast/:path*",
  ],
};
