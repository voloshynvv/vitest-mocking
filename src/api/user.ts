export async function getUserById(id: string) {
  const response = await fetch(`https://dummyjson.com/users/${id}`);

  if (!response.ok) {
    throw new Error(`could not fetch user with id ${id}`);
  }

  return response.json();
}
