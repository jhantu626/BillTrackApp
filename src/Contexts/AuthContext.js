import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [business, setBusiness] = useState(null);

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

  const setUserData = async userData => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Set user data error:', error);
    }
  };

  const setBusinessData = async businessData => {
    try {
      await AsyncStorage.setItem('business', JSON.stringify(businessData));
      setBusiness(businessData);
    } catch (error) {
      console.error('Set business data error:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['token', 'user', 'business']);
      setAuthToken(null);
      setUser(null);
      setBusiness(null);
    } catch (error) {}
  };

  const check = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userStr = await AsyncStorage.getItem('user');
      const businessStr = await AsyncStorage.getItem('business');
      setAuthToken(token);
      setUser(JSON.parse(userStr));
      setBusiness(JSON.parse(businessStr));
    } catch (error) {
    } finally {
      setIsLoading(false);
      SplashScreen.hide();
    }
  };

  useEffect(() => {
    check();
  }, []);

  const value = useMemo(() => {
    return {
      authToken,
      login,
      logout,
      user,
      setUserData,
      setBusinessData,
      business,
    };
  }, [authToken, user]);

  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const useAuthToken = () => {
  const {authToken} = useAuth();
  return authToken;
};

export const useUser = attribute => {
  const {user} = useAuth();
  return user[attribute];
};

export const useBusiness = attribute => {
  const {business} = useAuth();
  return business[attribute];
};

export default AuthProvider;
