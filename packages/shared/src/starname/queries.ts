export const getRegDomainQuery = (limit: number, page: number): string =>
  `message.action=register_domain&limit=${limit}&page=${page}`;

export const getRegAccountQuery = (limit: number, page: number): string =>
  `message.action=register_account&limit=${limit}&page=${page}`;

export const getDomainTransferQuery = (limit: number, page: number): string =>
  `message.action=transfer_domain&limit=${limit}&page=${page}`;

export const getAccountTransferQuery = (limit: number, page: number): string =>
  `message.action=transfer_account&limit=${limit}&page=${page}`;

export const getDomainRenewsQuery = (limit: number, page: number): string =>
  `message.action=renew_domain&limit=${limit}&page=${page}`;

export const getStarnameMessageModuleQuery = (limit: number, page: number): string =>
  `message.module=starname&limit=${limit}&page=${page}`;
