export const checkValidUrl = (url?: string) => {
  try {
    return Boolean(url && new URL(url));
  } catch (error: unknown) {
    console.log(error)
    return false;
  }
};
