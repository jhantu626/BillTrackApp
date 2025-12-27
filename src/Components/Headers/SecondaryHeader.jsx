import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import {colors} from '../../utils/colors';
import Octicons from '@react-native-vector-icons/octicons';
import {fonts} from '../../utils/fonts';
import {useNavigation} from '@react-navigation/native';
import {
  font,
  gap,
  heightResponsive,
  icon,
  padding,
} from '../../utils/responsive';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const SecondaryHeader = ({
  title = 'Title',
  isSearch = true,
  isQuestion = true,
  isNotification = true,
  isApps = false,
  isRestart = false,
  handleRestartClick = () => {},
  handleAppClick = () => {},
  query = '',
  onchangeText = text => {},
}) => {
  const navigation = useNavigation();

  // State variables
  const [isSearchActive, setSearchActive] = useState(false);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const rotation = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const onRestartPress = () => {
    rotation.value = withTiming(rotation.value + 360, {
      duration: 1500,
      easing: Easing.out(Easing.cubic), // 👈 very smooth
    });

    handleRestartClick();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={icon(24)} color={colors.primary} />
        </TouchableOpacity>
        {isSearchActive ? (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              value={query}
              onChangeText={text => onchangeText(text)}
              autoFocus
            />
            <Pressable
              onPress={() => {
                onchangeText('');
                setSearchActive(false);
              }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>
      {!isSearchActive && (
        <View style={styles.rightContainer}>
          {isApps && (
            <Pressable onPress={handleAppClick}>
              <Octicons name="apps" size={icon(22)} />
            </Pressable>
          )}
          {isSearch && (
            <Pressable onPress={() => setSearchActive(true)}>
              <Ionicons name="search" size={icon(22)} />
            </Pressable>
          )}
          {isRestart && <RestartButton onPress={handleRestartClick} />}

          {isQuestion && (
            <Pressable>
              <Octicons name="question" size={icon(22)} />
            </Pressable>
          )}
          {isNotification && (
            <Pressable>
              <Octicons name="bell" size={icon(22)} />
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
};

const RestartButton = memo(({onPress}) => {
  const rotation = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${rotation.value}deg`}],
  }));

  const handlePress = () => {
    rotation.value = withTiming(rotation.value + 360, {
      duration: 1500,
      easing: Easing.out(Easing.cubic),
    });

    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={rotateStyle}>
        <MaterialDesignIcons name="restart" size={icon(24)} />
      </Animated.View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    height: heightResponsive(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: padding(16),
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(10),
  },
  backButton: {
    width: icon(35),
    height: icon(35),
    backgroundColor: colors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: icon(35) / 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(10),
  },
  title: {
    fontSize: font(16),
    fontFamily: fonts.onMedium,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: gap(10),
  },
  searchInput: {
    flex: 1,
    fontSize: font(14),
    fontFamily: fonts.onMedium,
  },
  cancelText: {
    fontSize: font(12),
    fontFamily: fonts.onMedium,
  },
});

export default memo(SecondaryHeader);
