// File header: AccountsProvider wraps account-related state (current user,
// account list, and helpers). Use this provider where account data must be
// available to many components.
import { PropsWithChildren, createContext, use } from 'react';
import { personalInfoData } from 'data/account/personal-info';
import { PersonalInfo } from 'types/accounts';

interface AccountsContextInterface {
  personalInfo: PersonalInfo;
}

export const AccountsContext = createContext({} as AccountsContextInterface);

const AccountsProvider = ({ children }: PropsWithChildren) => {
  const personalInfoValues: PersonalInfo = personalInfoData;

  return (
    <AccountsContext
      value={{
        personalInfo: personalInfoValues,
      }}
    >
      {children}
    </AccountsContext>
  );
};

export const useAccounts = () => use(AccountsContext);

export default AccountsProvider;
