const localDateFromTimestamp = (timestamp: number) =>
  new Date(timestamp - new Date().getTimezoneOffset() * 60 * 1000)
    .toISOString()
    .split(".")[0]
    .replace("T", " ");

const computeProfileActiveNote = (time: Date) => {
  const now = new Date()
  const offset = now.getTime() - time.getTime()

  if (offset > 30*24*60*60000) {
    return "30d-deactive"
  }
  if (offset > 7*24*60*60000) {
    return "7d-deactive"
  }
  return "active"
}

export { localDateFromTimestamp, computeProfileActiveNote };
