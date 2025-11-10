import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token, user = {}) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.multiSet([
        ['token', token],
        ['user', JSON.stringify(user)],
      ]);
      setUser(user);
      setAuthToken(token);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      setAuthToken(null);
      setUser(null);
    } catch (error) {}
  };

  const check = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      setAuthToken(token);
      setUser(JSON.parse(user));
    } catch (error) {
    } finally {
      setIsLoading(false);
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    check();
  }, []);

  const userInfo = user || {};
  const value = useMemo(() => {
    return {authToken, login, logout, ...userInfo};
  }, [authToken, user]);

  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
