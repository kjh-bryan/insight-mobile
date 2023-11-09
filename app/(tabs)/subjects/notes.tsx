import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { useLocalSearchParams } from 'expo-router';
import { subjectType, noteType } from '../../../constants/Data';
import { SIZES } from '../../../constants/Theme';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';

export default function NotesScreen() {
  const subject = useLocalSearchParams() as unknown as subjectType;
  const [noteItems, setNoteItem] = useState<noteType[]>(subject.notes || []);
  const notes = subject.notes ? Object.values(subject.notes) : [];
  console.log(notes);
  const {
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
    themeTextStyle,
  } = ThemeUtils();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchInput = (text: string) => {
    setSearchValue(text);
    // Show list view on text
    const newItems: noteType[] = [];

    noteItems.forEach((item) => {
      if (item.noteTitle.match(text)) {
        newItems.push(item);
      }
    });

    setNoteItem(newItems);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.subjectTitle, themeTextStyle]}>{subject.title}</Text>
      <Text weight="semibold" style={styles.categoryTitle}>
        {subject.category}
      </Text>
      <TextInput
        style={styles.searchInput}
        value={searchValue}
        placeholder="Search"
        onChangeText={(text) => handleSearchInput(text)}
      />
      <FlatList
        data={noteItems}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              // open pdf
              console.log('Print pdf url : ', item.pdfUrl);
            }}
          >
            <View style={{ flex: 1, padding: 24 }}>
              <Text>{item.id}</Text>
              <Text>{item.noteTitle}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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
  searchInput: {
    marginTop: SIZES.base * 4,
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base / 2,
    borderColor: Colors.default.slate500,
  },
});
