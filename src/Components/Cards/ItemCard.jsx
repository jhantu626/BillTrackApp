import React, {useState, useCallback, memo} from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import Octicons from '@react-native-vector-icons/octicons';
import DottedDivider from '../Dividers/DottedDivider';
import {font, icon, padding} from '../../utils/responsive';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';

// Memoized list item to prevent re-renders
const SelectableItem = memo(({item}) => (
  <TouchableOpacity style={styles.selectableCrd}>
    <Text style={styles.subNameText}>Chicken Boti Kebab (6pc)</Text>
    <View style={styles.checkbox}>
      <Octicons name="check" color={colors.primary} size={icon(16)} />
    </View>
  </TouchableOpacity>
));

const ItemCard = ({expandable = false}) => {
  const [expanded, setExpanded] = useState(expandable);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(true);

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    height: withTiming(animatedHeight.value, {duration: 300}),
    overflow: 'hidden',
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(animatedOpacity.value, {duration: 200}),
  }));

  // Toggle expand/collapse
  const toggleExpand = useCallback(() => {
    if (isMeasuring) return; // Prevent toggles while measuring

    const newExpanded = !expanded;

    if (newExpanded) {
      animatedHeight.value = withTiming(contentHeight, {duration: 300});
      animatedOpacity.value = withTiming(1, {duration: 200, delay: 100});
    } else {
      animatedOpacity.value = withTiming(0, {duration: 150});
      animatedHeight.value = withTiming(0, {duration: 300, delay: 50});
    }

    setExpanded(newExpanded);
  }, [expanded, contentHeight, isMeasuring, animatedHeight, animatedOpacity]);

  const renderItem = useCallback(({item}) => <SelectableItem item={item} />, []);
  const data = React.useMemo(() => [1, 2, 3, 4, 5, 6, 7], []);
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  // Handle layout measurement
  const handleLayout = useCallback(
    event => {
      const height = event.nativeEvent.layout.height;
      if (height > 0 && contentHeight === 0) {
        setContentHeight(height);
        setIsMeasuring(false);

        // Initialize animation state based on `expandable` prop
        if (expandable) {
          animatedHeight.value = withTiming(height, {duration: 300});
          animatedOpacity.value = withTiming(1, {duration: 200, delay: 100});
        } else {
          animatedHeight.value = 0;
          animatedOpacity.value = 0;
        }
      }
    },
    [contentHeight, animatedHeight, animatedOpacity, expandable],
  );

  return (
    <View style={styles.card}>
      <Pressable
        style={[styles.cardHeader, !expanded && {backgroundColor: '#fff'}]}
        onPress={toggleExpand}
        disabled={isMeasuring}>
        <Text style={styles.cardHeaderTitle}>TANDOOR & KEBABS</Text>
        <Animated.View
          style={{
            transform: [
              {
                rotate: expanded ? '0deg' : '180deg',
              },
            ],
          }}>
          <MaterialIcons name="arrow-drop-up" size={icon(26)} />
        </Animated.View>
      </Pressable>

      {/* Animated collapsible container */}
      <Animated.View style={containerAnimatedStyle}>
        {/* Hidden measurement view (only once) */}
        {isMeasuring && (
          <View style={styles.measurementView} onLayout={handleLayout}>
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <DottedDivider marginVertical={0} />}
              scrollEnabled={false}
              removeClippedSubviews={false}
            />
          </View>
        )}

        {/* Actual content */}
        {!isMeasuring && (
          <Animated.View style={[styles.contentView, contentAnimatedStyle]}>
            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              ItemSeparatorComponent={() => <DottedDivider marginVertical={0} />}
              scrollEnabled={false}
              removeClippedSubviews
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  cardHeader: {
    paddingHorizontal: padding(16),
    paddingVertical: padding(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary + '95',
  },
  cardHeaderTitle: {
    fontSize: font(14),
    fontFamily: fonts.inMedium,
  },
  selectableCrd: {
    padding: padding(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subNameText: {
    fontSize: font(14),
    fontFamily: fonts.inRegular,
    flex: 1,
  },
  checkbox: {
    width: icon(20),
    height: icon(20),
    borderRadius: icon(4),
    backgroundColor: colors.border + '80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  measurementView: {
    position: 'absolute',
    width: '100%',
    opacity: 0,
    pointerEvents: 'none',
  },
  contentView: {
    width: '100%',
  },
});

export default React.memo(ItemCard);
