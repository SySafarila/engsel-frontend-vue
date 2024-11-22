import { jwtVerify } from "jose";
export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/admin")) {
    return;
  }
  console.log("Request: " + event.node.req.url);

  const accessToken = getCookie(event, "access_token");
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  if (!accessToken) {
    return await sendRedirect(event, "/login", 401);
  }

  try {
    await jwtVerify(accessToken!, secret);
  } catch (error) {
    console.error("JWT Invalid");
    setCookie(event, "access_token", "logout", {
      maxAge: 1,
    });
    await sendRedirect(event, "/login", 401);
  }
});
