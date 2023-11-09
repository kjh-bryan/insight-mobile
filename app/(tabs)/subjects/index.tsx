import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '../../../components/Themed';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import { SIZES } from '../../../constants/Theme';
import {
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { mainNote, mainNoteType } from '../../../constants/Data';
import { ListViewItem } from '../../../components/ListViewItem';
import Colors from '../../../constants/Colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

export default function SubjectsScreen() {
  const deviceHeight = Dimensions.get('window').height;
  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();
  const [searchValue, setSearchValue] = useState('');
  const [item, setItem] = useState([] as any);
  const insets = useSafeAreaInsets();
  console.log(insets);
  const notes = mainNote;
  useEffect(() => {
    (() => {
      setItem(mainNote);
    })();
  }, []);

  const handleSearchInput = (text: string) => {
    setSearchValue(text);
    // Show list view on text
    const newItems: mainNoteType[] = [];

    notes.forEach((items) => {
      if (items.title.match(text)) {
        newItems.push(items);
      }
    });

    setItem(newItems);
  };

  return (
    <View
      style={[
        styles.container,
        themeBackgroundStyle,
        { marginBottom: insets.bottom },
      ]}
    >
      <View style={{ flex: 1.5 }}>
        {/* Title */}
        <Text style={[styles.headerTitle]}>Notes</Text>
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          placeholder="Search"
          onChangeText={(text) => handleSearchInput(text)}
        />
      </View>
      <View style={{ flex: 6 }}>
        {/* List View */}
        <FlatList
          data={item}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/subjects/notes',
                  params: item,
                });
              }}
            >
              <ListViewItem item={item} />
            </TouchableWithoutFeedback>
          )}
        />
      </View>
      <View style={{ flex: 1.5 }}>
        {/* Import Lecture Notes */}
        <TouchableOpacity
          style={[styles.button, themeSecondaryBackgroundStyle]}
        >
          <MaterialIcons
            name="file-download"
            style={styles.buttonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.buttonLabel}>Import Lecture Notes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base * 2,
  },
  headerContainer: {
    flex: 1,
  },
  headerTitle: {
    marginTop: SIZES.base,
    fontSize: SIZES.h2,
  },
  searchInput: {
    marginTop: SIZES.base * 4,
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base / 2,
    borderColor: Colors.default.slate500,
  },
  button: {
    height: SIZES.height / 8,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: SIZES.marginTop / 2,
    marginBottom: SIZES.marginTop / 2,
    flexDirection: 'row',
  },
  buttonIcon: {
    fontSize: 40,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginLeft: SIZES.padding,
  },
  buttonLabel: {
    fontSize: SIZES.h3,
    color: Colors.light.primary,
    alignSelf: 'center',
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    marginLeft: SIZES.padding,
  },
});
