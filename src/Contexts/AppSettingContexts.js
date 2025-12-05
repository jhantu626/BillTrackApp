import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, useContext, useEffect, useState} from 'react';

const AppSettingContexts = createContext();

const defautlSettings = {
  PRINT_ON_CREATE_BILL: true, //Automatically print bill when 'Print' button is pressed in create bill screen
};

const AppSettingProvider = ({children}) => {
  const [appSettings, setAppSettings] = useState(defautlSettings);

  const updateAppSettings = async (key, value) => {
    const newSettings = {...appSettings, [key]: value};
    setAppSettings(newSettings);
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
      console.log(appSettings);
    } catch (err) {
      console.err(err);
    }
  };

  const resetSettings = async () => {
    try {
      await AsyncStorage.removeItem('appSettings');
      setAppSettings(defautlSettings);
    } catch (error) {
      console.err(error);
    }
  };

  const getByKey = async key => {
    return appSettings[key];
  };

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSetting = await AsyncStorage.getItem('appSettings');
        if (savedSetting) {
          setAppSettings(JSON.parse(savedSetting));
        }
      } catch (error) {
        console.err(error);
      }
    };
    loadSettings();
  }, []);

  return (
    <AppSettingContexts.Provider
      value={{appSettings, updateAppSettings, resetSettings, getByKey}}>
      {children}
    </AppSettingContexts.Provider>
  );
};

const useAppSettings = () => {
  return useContext(AppSettingContexts);
};

export {useAppSettings, AppSettingProvider};