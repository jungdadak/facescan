export async function getRank() {
  const res = await fetch("api/rank", {
    method: "GET",
  });
  const data = await res.json();
  return { data };
}
