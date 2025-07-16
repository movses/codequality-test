function checkUser(input: string | null) {
  let user;
  if (user = getUserFromInput(input)) {
    console.log("User found:", user.name);
  }
}

function getUserFromInput(input: string | null): { name: string } | null {
  if (input === "admin") {
    return { name: "Admin User" };
  }
  return null;
}

