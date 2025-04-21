
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SessionContext, UserRole } from '@/types/auth';

// Default session context
const defaultSession: SessionContext = {
  userId: '',
  currentCompanyId: '',
  currentBranchId: '',
  currentRole: 'staff',
  isAuthenticated: false,
};

type SessionContextProviderProps = {
  children: ReactNode;
};

// Create context
const SessionContextData = createContext<{
  session: SessionContext;
  setSession: (session: SessionContext) => void;
  clearSession: () => void;
  setRole: (role: UserRole) => void; // NEW for mock role switching
}>({
  session: defaultSession,
  setSession: () => {},
  clearSession: () => {},
  setRole: () => {},
});

// Custom hook for using the session context
export const useSession = () => useContext(SessionContextData);

export const SessionProvider = ({ children }: SessionContextProviderProps) => {
  const [session, setSessionState] = useState<SessionContext>(() => {
    // Try to get session from localStorage on initial load
    const savedSession = localStorage.getItem('wasper_session');
    return savedSession ? JSON.parse(savedSession) : defaultSession;
  });

  // Update localStorage when session changes
  useEffect(() => {
    if (session.isAuthenticated) {
      localStorage.setItem('wasper_session', JSON.stringify(session));
    } else {
      localStorage.removeItem('wasper_session');
    }
  }, [session]);

  const setSession = (newSession: SessionContext) => {
    setSessionState(newSession);
  };

  const clearSession = () => {
    setSessionState(defaultSession);
    localStorage.removeItem('wasper_session');
  };

  // NEW: Set only the current role (mock, for switching)
  const setRole = (role: UserRole) => {
    setSessionState((prev) => ({ ...prev, currentRole: role, isAuthenticated: true }));
  };

  return (
    <SessionContextData.Provider value={{ session, setSession, clearSession, setRole }}>
      {children}
    </SessionContextData.Provider>
  );
};

