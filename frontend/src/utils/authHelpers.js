export function updateAuthHeaders(res) {
  const token = res.headers.get("access-token");
  const client = res.headers.get("client");
  const uid = res.headers.get("uid");

  if (token && client && uid) {
    localStorage.setItem("access-token", token);
    localStorage.setItem("client", client);
    localStorage.setItem("uid", uid);
  }
}

export function updateInstructorAuthHeaders(res) {
  const token = res.headers.get("access-token");
  const client = res.headers.get("client");
  const uid = res.headers.get("uid");

  if (token && client && uid) {
    localStorage.setItem("instructor-token", token);
    localStorage.setItem("instructor-client", client);
    localStorage.setItem("instructor-uid", uid);
  }
}
