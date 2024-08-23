export const getStates = async () => {
  const res = await fetch("http://localhost:3000/api/states");
  if (!res.ok) {
    return new Error("failed to fetch states from api");
  }
  return res.json();
};
export const getStateById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/states?id=${id}`);
  if (!res.ok) {
    return new Error("failed to fetch state from api");
  }
  const main = await res.json();

  return main.data;
};
