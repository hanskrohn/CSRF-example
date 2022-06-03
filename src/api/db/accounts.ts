import { Accounts } from "../../global/accounts.interface";

export const user: Accounts = {
  id: "userAccount",
  balance: 10000,
};

export const maliciousUser: Accounts = {
  id: "maliciousAccount",
  balance: 0,
};
