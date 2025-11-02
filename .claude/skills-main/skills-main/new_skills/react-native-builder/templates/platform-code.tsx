import { Platform, StyleSheet, Dimensions } from 'react-native'
import { View, Text, TouchableOpacity } from 'react-native'

/**
 * PLATFORM-SPECIFIC CODE PATTERNS
 *
 * Handle iOS and Android differences
 */

/**
 * PATTERN 1: Platform Detection
 */

export const platformUtils = {
  isIOS: Platform.OS === 'ios',
  isAndroid: Platform.OS === 'android',
  isWeb: Platform.OS === 'web',

  // Platform version
  version: Platform.Version,

  // Run code based on platform
  select<T>(options: { ios?: T; android?: T; default?: T }): T | undefined {
    return Platform.select(options)
  },

  // Run different code per platform
  execute(handlers: { ios?: () => void; android?: () => void; default?: () => void }) {
    const handler = Platform.select(handlers)
    if (handler) handler()
  },
}

/**
 * PATTERN 2: Platform-Specific Styles
 */

export const platformStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0, // iOS status bar
    ...Platform.select({
      ios: {
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        backgroundColor: '#f5f5f5',
        elevation: 4,
      },
    }),
  },

  text: {
    fontSize: 16,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto',
      default: 'System',
    }),
  },

  button: {
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    paddingHorizontal: 20,
    borderRadius: Platform.OS === 'ios' ? 8 : 4,
  },
})

/**
 * PATTERN 3: Conditional Rendering
 */

export function PlatformComponent() {
  return (
    <View>
      {Platform.OS === 'ios' && <Text>iOS Specific Content</Text>}
      {Platform.OS === 'android' && <Text>Android Specific Content</Text>}

      {/* Using Platform.select */}
      {Platform.select({
        ios: <IOSComponent />,
        android: <AndroidComponent />,
      })}
    </View>
  )
}

function IOSComponent() {
  return <Text>iOS Component</Text>
}

function AndroidComponent() {
  return <Text>Android Component</Text>
}

/**
 * PATTERN 4: Platform-Specific Files
 *
 * Create separate files for each platform:
 * - Component.ios.tsx
 * - Component.android.tsx
 *
 * React Native will automatically import the correct file
 */

// Component.ios.tsx
export function Button_iOS({ title, onPress }: any) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  )
}

// Component.android.tsx
export function Button_Android({ title, onPress }: any) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 4,
        elevation: 2,
      }}
      onPress={onPress}
    >
      <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  )
}

/**
 * PATTERN 5: SafeArea Handling
 */

import { SafeAreaView } from 'react-native-safe-area-context'

export function SafeScreen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  )
}

// Manual safe area for iOS
export const getSafeAreaInsets = () => {
  const { height, width } = Dimensions.get('window')

  // iPhone X and newer notch sizes
  const hasNotch = height >= 812 && width >= 375

  return Platform.select({
    ios: {
      top: hasNotch ? 44 : 20,
      bottom: hasNotch ? 34 : 0,
    },
    android: {
      top: 0,
      bottom: 0,
    },
    default: {
      top: 0,
      bottom: 0,
    },
  })
}

/**
 * PATTERN 6: Status Bar
 */

import { StatusBar } from 'react-native'

export function AppStatusBar() {
  return Platform.select({
    ios: <StatusBar barStyle="dark-content" />,
    android: <StatusBar barStyle="light-content" backgroundColor="#2196F3" />,
  })
}

/**
 * PATTERN 7: Navigation Header
 */

export const headerStyles = {
  ios: {
    headerStyle: {
      backgroundColor: '#f8f8f8',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    headerTitleStyle: {
      fontSize: 17,
      fontWeight: '600',
    },
  },
  android: {
    headerStyle: {
      backgroundColor: '#2196F3',
      elevation: 4,
    },
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: '500',
      color: '#fff',
    },
    headerTintColor: '#fff',
  },
}

/**
 * PATTERN 8: Haptic Feedback (iOS)
 */

import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

export const haptics = {
  impact: (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('impactLight', {
        enableVibrateFallback: false,
      })
    }
  },

  selection: () => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('selection')
    }
  },

  notification: (type: 'success' | 'warning' | 'error') => {
    if (Platform.OS === 'ios') {
      ReactNativeHapticFeedback.trigger('notificationSuccess')
    }
  },
}

/**
 * PATTERN 9: Keyboard Behavior
 */

import { KeyboardAvoidingView, ScrollView } from 'react-native'

export function KeyboardAvoidingForm({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
    </KeyboardAvoidingView>
  )
}

/**
 * PATTERN 10: Permissions
 */

import { PermissionsAndroid } from 'react-native'

export const permissions = {
  async requestCamera(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      // iOS handles permissions automatically
      return true
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  },

  async requestLocation(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      return true
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      return granted === PermissionsAndroid.RESULTS.GRANTED
    } catch (err) {
      console.warn(err)
      return false
    }
  },
}

/**
 * PATTERN 11: Device Info
 */

export const deviceInfo = {
  isTablet: () => {
    const { height, width } = Dimensions.get('window')
    const aspectRatio = height / width
    return Math.min(height, width) >= 600 && aspectRatio < 1.6
  },

  isSmallDevice: () => {
    const { height, width } = Dimensions.get('window')
    return Math.min(height, width) < 375
  },

  hasNotch: () => {
    const { height, width } = Dimensions.get('window')
    return (
      Platform.OS === 'ios' &&
      !platformUtils.select({ ios: false, default: true }) &&
      (height >= 812 || width >= 812)
    )
  },
}

/**
 * PATTERN 12: Dynamic Imports
 */

export const platformComponents = {
  DatePicker: Platform.select({
    ios: () => require('./DatePicker.ios').default,
    android: () => require('./DatePicker.android').default,
  }),

  Picker: Platform.select({
    ios: () => require('./Picker.ios').default,
    android: () => require('./Picker.android').default,
  }),
}

/**
 * PATTERN 13: Font Loading
 */

export const fonts = {
  ios: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  android: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
}

export const getFontFamily = (weight: 'regular' | 'medium' | 'bold' = 'regular') => {
  return Platform.select({
    ios: fonts.ios[weight],
    android: fonts.android[weight],
    default: 'System',
  })
}

/**
 * PATTERN 14: Shadows
 */

export const createShadow = (elevation: number) => {
  return Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: elevation / 2,
      },
      shadowOpacity: 0.1 + elevation * 0.02,
      shadowRadius: elevation / 2,
    },
    android: {
      elevation,
    },
    default: {},
  })
}
