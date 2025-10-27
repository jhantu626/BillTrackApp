import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AuthHome,
  BusinessSetup,
  BusinessSetup2,
  CreateBill,
  Home,
  Invoice,
  Login,
  Onboarding,
  OtpVerify,
} from './Screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Octicons from '@react-native-vector-icons/octicons';
import {fonts} from './utils/fonts';
import {colors} from './utils/colors';

// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const AuthStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="AuthHome" component={AuthHome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Otp" component={OtpVerify} />
        <Stack.Screen name="BusinessSetup" component={BusinessSetup} />
        <Stack.Screen name="BusinessSetup2" component={BusinessSetup2} />
      </Stack.Navigator>
    );
  };

  const AppStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Invoice"
        screenOptions={{
          animation: 'shift',
          headerShown: false,
          tabBarStyle: {
            height: 85,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: fonts.onMedium,
            marginTop: 1,
          },
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarActiveTintColor: colors.primary,
          tabBarButton: props => (
            <TouchableWithoutFeedback onPress={props.onPress}>
              <View {...props} />
            </TouchableWithoutFeedback>
          ),
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Image
                source={require('./../asset/images/hometab.png')}
                style={[styles.tabbarIcon, {tintColor: focused ? color : ''}]}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Product"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Image
                source={require('./../asset/images/producttab.png')}
                style={[styles.tabbarIcon, {tintColor: focused ? color : ''}]}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Create"
          component={CreateBill}
          options={{
            tabBarStyle: {
              display: 'none',
            },
            tabBarIcon: ({focused, color}) => (
              <View style={styles.createTabParent}>
                <Image
                  source={require('./../asset/images/createtab.png')}
                  style={[styles.tabbarIcon, {tintColor: '#fff'}]}
                  resizeMode="contain"
                />
              </View>
            ),
            tabBarLabel: '',
            tabBarLabelStyle: {display: 'none'},
          }}
        />
        <Tab.Screen
          name="Invoice"
          component={Invoice}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Image
                source={require('./../asset/images/invoicetab.png')}
                style={[styles.tabbarIcon, {tintColor: focused ? color : ''}]}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Home}
          options={{
            tabBarIcon: ({focused, color}) => (
              <Image
                source={require('./../asset/images/accounttab.png')}
                style={[styles.tabbarIcon, {tintColor: focused ? color : ''}]}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  const AppNav = () => {
    const authToken = true;
    return (
      <NavigationContainer>
        {authToken ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  };

  return <AppNav />;
};

export default App;

const styles = StyleSheet.create({
  tabbarIcon: {
    width: 22,
    height: 22,
  },
  createTabParent: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
