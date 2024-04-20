import { createContext, PropsWithChildren, useContext } from 'react';

export const createContextProvider = <T extends object>(displayName: string) => {
  const Ctx = createContext<T>(
    new Proxy({} as T, {
      get: () => {
        throw new Error('Could not use context outside of provider');
      },
    })
  );

  function Provider({ children, value }: PropsWithChildren & { value: T }) {
    return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
  }

  Provider.displayName = displayName;

  const useProvidedContext = () => useContext(Ctx);

  return { Provider, useProvidedContext };
};
