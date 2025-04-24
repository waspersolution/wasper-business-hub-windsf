
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SessionContext as SessionContextType, UserRole } from '@/types/auth';

// Default session context
const defaultSession: SessionContextType = {
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
  session: SessionContextType;
  setSession: (session: SessionContextType) => void;
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

export const SessionProvider: React.FC<SessionContextProviderProps> = ({ children }) => {
  const [session, setSessionState] = useState<SessionContextType>(() => {
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

  const setSession = (newSession: SessionContextType) => {
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
