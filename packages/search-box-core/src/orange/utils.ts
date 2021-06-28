export function toStringify (value: object): string {
  try {
    return JSON.stringify(value)
  } catch (error) {
    console.log(error)
    return ''
  }
}

export function toParsed (value: string): object {
  try {
    return JSON.parse(value)
  } catch (error) {
    console.error(error)
    return {}
  }
}
