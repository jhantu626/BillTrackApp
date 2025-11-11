// components/CustomToast.tsx
import React, { useEffect, useMemo } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Ionicons from '@react-native-vector-icons/ionicons';

const { height } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface CustomToastProps {
  visible: boolean;
  message: string;
  type?: ToastType;
  position?: ToastPosition;
  duration?: number;
  onHide?: () => void;
}

const iconConfig: Record<ToastType, { name: string; color: string }> = {
  success: { name: 'checkmark-circle', color: '#16a34a' },
  error: { name: 'close-circle', color: '#dc2626' },
  warning: { name: 'warning', color: '#f59e0b' },
  info: { name: 'information-circle', color: '#2563eb' },
};

const CustomToast: React.FC<CustomToastProps> = React.memo(
  ({ visible, message, type = 'info', position = 'top', duration = 2000, onHide }) => {
    const opacity = useSharedValue(0);
    const translate = useSharedValue(0);
    const visibleShared = useSharedValue(0);

    // Control visibility with Reanimated shared value
    useEffect(() => {
      visibleShared.value = visible ? 1 : 0;
    }, [visible]);

    // Handle animations purely on UI thread
    useDerivedValue(() => {
      if (visibleShared.value) {
        opacity.value = withTiming(0.9, { duration: 250 });
        translate.value = withSpring(1);
      } else {
        opacity.value = withTiming(0, { duration: 200 });
        translate.value = withTiming(0, { duration: 200 }, () => {
          if (onHide) runOnJS(onHide)();
        });
      }
    });

    // Hide automatically after duration
    useEffect(() => {
      if (visible) {
        const timer = setTimeout(() => {
          visibleShared.value = 0;
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [visible, duration]);

    const animatedStyle = useAnimatedStyle(() => {
      const transforms: { translateX?: number; translateY?: number }[] = [];
      switch (position) {
        case 'top':
          transforms.push({ translateY: (1 - translate.value) * -60 });
          break;
        case 'bottom':
          transforms.push({ translateY: (1 - translate.value) * 60 });
          break;
        case 'left':
          transforms.push({ translateX: (1 - translate.value) * -100 });
          break;
        case 'right':
          transforms.push({ translateX: (1 - translate.value) * 100 });
          break;
      }
      return { opacity: opacity.value, transform: transforms };
    });

    const positionStyle = useMemo(() => {
      switch (position) {
        case 'top':
          return { top: 80, alignSelf: 'center' };
        case 'bottom':
          return { bottom: 80, alignSelf: 'center' };
        case 'left':
          return { left: 20, top: height / 2 - 40 };
        case 'right':
          return { right: 20, top: height / 2 - 40 };
        case 'center':
        default:
          return { top: height / 2 - 40, alignSelf: 'center' };
      }
    }, [position]);

    if (!visible) return null;
    const icon = iconConfig[type];

    return (
      <Animated.View style={[styles.toast, positionStyle, animatedStyle]}>
        <Ionicons name={icon.name} size={22} color={icon.color} style={styles.icon} />
        <Text style={styles.text}>{message}</Text>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4, // lighter shadow for less GPU cost
    elevation: 6,
  },
  text: {
    color: '#111',
    fontSize: 15,
    fontWeight: '500',
  },
  icon: {
    marginRight: 8,
  },
});

export default CustomToast;
