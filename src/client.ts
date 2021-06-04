export const clientFromUrl = (url: string = window.location.href): string | null => {
  // TODO 2021-06-04 maybe utilize Path instead of split?
  const pathnames = new URL(url).pathname.split('/');
  if (pathnames.length < 1 || pathnames[1] === "") {
    return null
  }
  return pathnames[1]
}
