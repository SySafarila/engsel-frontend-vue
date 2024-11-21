export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  setCookie(event, "access_token", body.access_token, {
    httpOnly: true,
    maxAge: 60 * 60 * 6,
  });

  return {
    message: "Token saved!",
  };
  // ... Do whatever you want here
});
