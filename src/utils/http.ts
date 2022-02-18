export const http = async <R = any>(url: string) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}${url}`)

  return (await res.json()) as R
}
