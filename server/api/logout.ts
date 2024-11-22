export default defineEventHandler(async (event) => {
  setCookie(event, "access_token", "logout", {
    httpOnly: true,
    maxAge: 1,
  });

  return {
    message: "Logout success",
  };
  // ... Do whatever you want here
});
