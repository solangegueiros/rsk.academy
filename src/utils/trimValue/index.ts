export const trimValue = (account: string, character = 4): string =>
  `${account?.slice(0, character)}...${account?.slice(account.length - character)}`
