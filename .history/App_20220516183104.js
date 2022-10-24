import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

export default function App() {
  const progress = useRef(new Animated.Value(0.5)).current; // useSharedValue(0)
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // withTiming, withSpring
    // withRepeat
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {toValue: 1, useNativeDriver: true}),
          Animated.spring(progress, {toValue: 0.5, useNativeDriver: true}),
        ]),
        Animated.sequence([
          Animated.spring(scale, {toValue: 2, useNativeDriver: true}),
          Animated.spring(scale, {toValue: 1, useNativeDriver: true}),
        ]),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          style={[
            styles.square,
            {
              borderRadius: progress.interpolate({
                inputRange: [0.5, 1],
                outputRange: [SIZE / 4, SIZE / 2],
              }),
              opacity: progress,
              transform: [
                {scale: scale},
                {
                  rotate: progress.interpolate({
                    inputRange: [0.5, 1],
                    outputRange: ['180deg', '270deg'],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            {
              backgroundColor: 'rgba(0,123,132,0.7)',
              height: 5,
              marginTop: 100,
            },
            {
              transform: [
                {
                  scaleX: progress,
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const SIZE = 100.0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,123,132,0.7)',
  },
});
