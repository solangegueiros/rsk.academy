export const trimValue = (account, character = 4) =>
  `${account?.slice(0, character)}...${account?.slice(
    account.length - character,
  )}`
