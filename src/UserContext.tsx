import React from "react"
import { LoginUserChurchInterface } from "./appBase/interfaces";
import { PersonInterface, UserContextInterface, UserInterface } from "./helpers";

interface SLUserContextInterface extends UserContextInterface {
  displayName: string,
  setDisplayName: (name: string) => void
}

const UserContext = React.createContext<SLUserContextInterface | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const [displayName, setDisplayName] = React.useState<string>("");
  const [user, setUser] = React.useState<UserInterface>(null);
  const [person, setPerson] = React.useState<PersonInterface>(null);
  const [userChurch, setUserChurch] = React.useState<LoginUserChurchInterface>(null);
  const [userChurches, setUserChurches] = React.useState<LoginUserChurchInterface[]>(null);

  return <UserContext.Provider value={{
    displayName, setDisplayName,
    user, setUser,
    userChurch, setUserChurch,
    userChurches, setUserChurches,
    person, setPerson
  }}>{children}</UserContext.Provider>
};

export default UserContext;
