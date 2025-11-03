import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useCallback} from 'react';
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

const SecondaryHeader = memo(
  ({
    title = 'Title',
    isSearch = true,
    isQuestion = true,
    isNotification = true,
    isApps = false,
    handleAppClick = () => {},
  }) => {
    const navigation = useNavigation();
    const handleBack = useCallback(() => {
      navigation.goBack();
    }, [navigation]);
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons
              name="arrow-back"
              size={icon(24)}
              color={colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          {isApps && (
            <Pressable onPress={handleAppClick}>
              <Octicons name="apps" size={icon(22)} />
            </Pressable>
          )}
          {isSearch && (
            <Pressable>
              <Ionicons name="search" size={icon(22)} />
            </Pressable>
          )}
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
      </View>
    );
  },
);

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
});

export default SecondaryHeader;
