import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { mainNoteType, noteType } from '../../../constants/Data';
import { SIZES } from '../../../constants/Theme';
import { ThemeUtils } from '../../../utils/ThemeUtils';

export default function NotesScreen() {
  const item = useLocalSearchParams();

  const {
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
    themeTextStyle,
  } = ThemeUtils();

  return (
    <View style={styles.container}>
      <Text style={[styles.subjectTitle, themeTextStyle]}>{item.title}</Text>
      <Text weight="semibold" style={styles.categoryTitle}>
        {item.category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base * 2,
  },
  subjectTitle: {
    fontSize: SIZES.h2,
    marginBottom: SIZES.base,
  },
  categoryTitle: {
    fontSize: SIZES.h5,
  },
});
