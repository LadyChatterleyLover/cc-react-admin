
export const useUuid = (len: number) => {
  const id = Number(Math.random().toString().substr(3, len) + Date.now()).toString(36);
  return {
    id
  }
}