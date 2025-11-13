import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  About,
  Account,
  AuthHome,
  BusinessSetup,
  BusinessSetup2,
  CreateBill,
  HelpAndSupport,
  Home,
  Invoice,
  InvoiceDetails,
  ItemMaster,
  Login,
  Onboarding,
  OtpVerify,
  Product,
  SalesReport,
  Subscription,
} from './Screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Octicons from '@react-native-vector-icons/octicons';
import {fonts} from './utils/fonts';
import {colors} from './utils/colors';
import {memo, useCallback, useMemo} from 'react';
import {font, icon, margin, padding} from './utils/responsive';
import AuthProvider, {
  useAuth,
  useBusiness,
  useUser,
} from './Contexts/AuthContext';

// import { GestureHandlerRootView } from 'react-native-gesture-handler';

const icons = {
  Home: require('./../asset/images/hometab.png'),
  Invoice: require('./../asset/images/invoicetab.png'),
  CreateBill: require('./../asset/images/createtab.png'),
  Product: require('./../asset/images/producttab.png'),
  Account: require('./../asset/images/accounttab.png'),
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="AuthHome" component={AuthHome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Otp" component={OtpVerify} />
    </Stack.Navigator>
  );
});

const HomeStack = memo(() => {
  const businessId = useUser('businessId');
  return (
    <Stack.Navigator
      initialRouteName={businessId ? 'Home' : 'BusinessSetup'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetails}
        options={{
          animation: 'slide_from_bottom',
          animationDuration: 200,
        }}
      />
      <Stack.Screen name="BusinessSetup" component={BusinessSetup} />
      <Stack.Screen name="BusinessSetup2" component={BusinessSetup2} />
    </Stack.Navigator>
  );
});

const InvoiceStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName="Invoice"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Invoice" component={Invoice} />
      <Stack.Screen
        name="InvoiceDetails"
        component={InvoiceDetails}
        options={{
          animation: 'slide_from_bottom',
          animationDuration: 200,
        }}
      />
    </Stack.Navigator>
  );
});

const AccountStack = memo(() => {
  return (
    <Stack.Navigator
      initialRouteName="ItemMaster"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Subscription" component={Subscription} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="SalesAndReport" component={SalesReport} />
      <Stack.Screen name="ItemMaster" component={ItemMaster} />
    </Stack.Navigator>
  );
});

const AppStack = memo(() => {
  const renderTabIcon = useCallback(
    iconSource =>
      ({focused, color}) =>
        (
          <Image
            source={iconSource}
            style={[styles.tabbarIcon, {tintColor: focused ? color : 'gray'}]}
            resizeMode="contain"
          />
        ),
    [],
  );
  return (
    <Tab.Navigator
      initialRouteName="Account"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: true,
        animation: 'shift',
        tabBarStyle: {
          height: 85,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: padding(10),
        },
        tabBarLabelStyle: {
          fontSize: font(12),
          fontFamily: fonts.onMedium,
          // marginTop: 1,
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
        component={HomeStack}
        options={{
          tabBarIcon: renderTabIcon(icons.Home),
        }}
      />
      <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarIcon: renderTabIcon(icons.Product),
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
                source={icons.CreateBill}
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
        component={InvoiceStack}
        options={({route}) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'Invoice';
          return {
            tabBarIcon: renderTabIcon(icons.Invoice),
            tabBarStyle:
              routeName === 'InvoiceDetails'
                ? {
                    display: 'none',
                  }
                : {
                    height: 85,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: padding(10),
                  },
          };
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarIcon: renderTabIcon(icons.Account),
        }}
      />
    </Tab.Navigator>
  );
});

const AppNav = () => {
  const {authToken} = useAuth();
  if (!authToken) {
    return <AuthStack />;
  }
  return <AppStack />;
};
const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNav />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default memo(App);

const styles = StyleSheet.create({
  tabbarIcon: {
    width: icon(22),
    height: icon(22),
  },
  createTabParent: {
    backgroundColor: colors.primary,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: margin(10),
  },
});
