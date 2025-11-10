import {createContext, useContext, useEffect, useState} from 'react';
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
      setUser(user);
      setAuthToken(token);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      setAuthToken(null);
      setUser(null);
    } catch (error) {}
  };

  const check = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      console.log('token', token);
      console.log('user', JSON.parse(user));
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

  if (isLoading) {
    return null;
  }

  const userInfo = user || {};

  return (
    <AuthContext.Provider value={{authToken, login, logout, ...userInfo}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
