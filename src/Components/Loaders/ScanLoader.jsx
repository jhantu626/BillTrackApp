import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const DashedCircle = ({ size, borderWidth = 1, color = '#444', dashWidth = 4, gapWidth = 4 }) => {
  const circumference = Math.PI * size;
  const dashCount = Math.floor(circumference / (dashWidth + gapWidth));
  
  return (
    <View style={[styles.dashedCircle, { width: size, height: size }]}>
      {Array.from({ length: dashCount }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dash,
            {
              width: borderWidth,
              height: dashWidth,
              backgroundColor: color,
              transform: [
                { rotate: `${(360 / dashCount) * index}deg` }
              ],
            },
          ]}
        />
      ))}
    </View>
  );
};

const ScanLoader = () => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        {/* Outer dashed circle */}
        <DashedCircle size={110} />
        
        {/* Middle dashed circle */}
        <DashedCircle size={110} dashWidth={3} gapWidth={6} />
        
        {/* Inner dashed circle */}
        <DashedCircle size={50} dashWidth={2} gapWidth={4} />
        
        {/* Rotating radar */}
        <Animated.View style={[styles.radar, animatedStyle]}>
          <View style={styles.radarGlow} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  loader: {
    width: 150,
    height: 150,
    backgroundColor: 'transparent',
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.55,
    shadowRadius: 25,
    elevation: 25,
  },
  dashedCircle: {
    position: 'absolute',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  dash: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -0.5,
  },
  radar: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    height: '100%',
    backgroundColor: 'transparent',
    transformOrigin: 'top left',
  },
  radarGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#FB833F90',
    transformOrigin: 'top left',
    transform: [{ rotate: '-55deg' }],
    shadowColor: '#FB833F',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 30,
  },
});

export default ScanLoader;