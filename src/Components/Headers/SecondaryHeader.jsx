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

const SecondaryHeader = memo(
  ({
    title = 'Title',
    isSearch = true,
    isQuestion = true,
    isNotification = true,
  }) => {
    const navigation = useNavigation();
    const handleBack = useCallback(() => {
      navigation.goBack();
    }, [navigation]);
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightContainer}>
          {isSearch && (
            <Pressable>
              <Ionicons name="search" size={22} />
            </Pressable>
          )}
          {isQuestion && (
            <Pressable>
              <Octicons name="question" size={22} />
            </Pressable>
          )}
          {isNotification && (
            <Pressable>
              <Octicons name="bell" size={22} />
            </Pressable>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  backButton: {
    width: 35,
    height: 35,
    backgroundColor: colors.primary + 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40 / 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.onMedium,
  },
});

export default SecondaryHeader;
