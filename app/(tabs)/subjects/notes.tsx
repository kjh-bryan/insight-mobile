import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { router, useLocalSearchParams } from 'expo-router';
import { NoteType } from '../../../constants/Data';
import { SIZES } from '../../../constants/Theme';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import {
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';
import { CardViewItem } from '../../../components/CardViewItem';
import { getNotesBySubjectId } from '../../../services/notes';
import { NoteLoader } from '../../../components/NoteLoader';

const width = Dimensions.get('window').width - SIZES.padding * 2;
export default function NotesScreen() {
  const { id, category, title } = useLocalSearchParams<{
    id: string;
    category: string;
    title: string;
  }>();
  const [noteItems, setNoteItem] = useState<NoteType[]>();
  const [unfilteredNoteItems, setUnfilteredNoteItem] = useState<NoteType[]>();
  const [loading, setLoading] = useState(true);
  const { themeTextStyle } = ThemeUtils();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    (async () => {
      const result = await getNotesBySubjectId(Number(id));

      setNoteItem(result.result);
      setUnfilteredNoteItem(result.result);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, []);

  const handleSearchInput = (text: string) => {
    setSearchValue(text);
    // Show list view on text

    if (text) {
      const filteredList = unfilteredNoteItems?.filter((note: NoteType) =>
        note.note_title.toLowerCase().includes(text.toLowerCase())
      );
      setNoteItem(filteredList);
    } else {
      setNoteItem(unfilteredNoteItems);
    }
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.subjectTitle, themeTextStyle]}>{title}</Text>
      <Text weight="semibold" style={styles.categoryTitle}>
        {category}
      </Text>
      <TextInput
        style={styles.searchInput}
        value={searchValue}
        placeholder="Search"
        onChangeText={(text) => handleSearchInput(text)}
      />
      <View style={styles.cardViewContainer}>
        {loading ? (
          <NoteLoader width={width} />
        ) : (
          <FlatList
            numColumns={2}
            columnWrapperStyle={{
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
            data={noteItems}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  // open pdf
                  console.log('Print pdf url : ', item.note_url);
                  router.push({
                    pathname: '/(tabs)/subjects/pdf',
                    params: {
                      src: item.note_url ?? '',
                      title: item.note_title,
                    },
                  });
                }}
                disabled={item.note_url == null}
              >
                <CardViewItem item={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base * 2,
    paddingBottom: SIZES.base * 2,
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
  cardViewContainer: {
    flex: 1,
    paddingHorizontal: SIZES.base,
    paddingTop: SIZES.base,
  },
});
