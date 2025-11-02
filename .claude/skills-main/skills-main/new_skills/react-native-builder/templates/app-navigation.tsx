import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Icon from 'react-native-vector-icons/Ionicons'

/**
 * REACT NATIVE NAVIGATION SETUP
 *
 * Complete navigation patterns for React Native apps
 */

/**
 * PATTERN 1: Stack Navigator (Basic)
 */

// Define route params
export type RootStackParamList = {
  Home: undefined
  Profile: { userId: string }
  Settings: undefined
  Details: { itemId: number; title: string }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerRight: () => (
            <Icon
              name="settings-outline"
              size={24}
              color="#fff"
              style={{ marginRight: 15 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: `Profile ${route.params.userId}`,
        })}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerBackTitle: 'Back',
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  )
}

/**
 * PATTERN 2: Tab Navigator
 */

export type TabParamList = {
  HomeTab: undefined
  SearchTab: undefined
  NotificationsTab: undefined
  ProfileTab: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string

          switch (route.name) {
            case 'HomeTab':
              iconName = focused ? 'home' : 'home-outline'
              break
            case 'SearchTab':
              iconName = focused ? 'search' : 'search-outline'
              break
            case 'NotificationsTab':
              iconName = focused ? 'notifications' : 'notifications-outline'
              break
            case 'ProfileTab':
              iconName = focused ? 'person' : 'person-outline'
              break
            default:
              iconName = 'help-outline'
          }

          return <Icon name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', tabBarBadge: 3 }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ tabBarLabel: 'Search' }}
      />
      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Notifications' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  )
}

/**
 * PATTERN 3: Drawer Navigator
 */

export type DrawerParamList = {
  Home: undefined
  Profile: undefined
  Settings: undefined
  About: undefined
}

const Drawer = createDrawerNavigator<DrawerParamList>()

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        drawerActiveTintColor: '#2196F3',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  )
}

/**
 * PATTERN 4: Nested Navigation (Tab + Stack)
 */

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export function NestedTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStack} />
      <Tab.Screen name="ProfileTab" component={ProfileStack} />
    </Tab.Navigator>
  )
}

/**
 * PATTERN 5: Authentication Flow
 */

type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
}

type AppStackParamList = {
  Main: undefined
  Profile: { userId: string }
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const AppStack = createNativeStackNavigator<AppStackParamList>()

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  )
}

function AppNavigator() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Main" component={TabNavigator} />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
    </AppStack.Navigator>
  )
}

export function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

/**
 * PATTERN 6: Deep Linking
 */

const linking = {
  prefixes: ['myapp://', 'https://myapp.com'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'profile/:userId',
      Details: 'details/:itemId',
      Settings: 'settings',
    },
  },
}

export function AppWithDeepLinking() {
  return (
    <NavigationContainer linking={linking}>
      <StackNavigator />
    </NavigationContainer>
  )
}

/**
 * PATTERN 7: Navigation with TypeScript
 */

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'

// Screen props types
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>
  route: RouteProp<RootStackParamList, 'Home'>
}

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>
  route: RouteProp<RootStackParamList, 'Profile'>
}

/**
 * Example Screens
 */

import { View, Text, Button, StyleSheet } from 'react-native'

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', { userId: '123' })}
      />
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 42, title: 'Item' })}
      />
    </View>
  )
}

function ProfileScreen({ navigation, route }: ProfileScreenProps) {
  const { userId } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text>User ID: {userId}</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  )
}

function DetailsScreen({ route }: any) {
  const { itemId, title } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text>Item ID: {itemId}</Text>
    </View>
  )
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings Screen</Text>
    </View>
  )
}

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Screen</Text>
    </View>
  )
}

function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications Screen</Text>
    </View>
  )
}

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Screen</Text>
    </View>
  )
}

function SignInScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In Screen</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  )
}

function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up Screen</Text>
    </View>
  )
}

function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})
