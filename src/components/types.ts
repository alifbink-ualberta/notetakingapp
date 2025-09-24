export type Note = {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string | Date
  updatedAt: string
}

export const formatDate = (date: Date) => {
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined, // omit seconds
    hour12: true,
  })
}
