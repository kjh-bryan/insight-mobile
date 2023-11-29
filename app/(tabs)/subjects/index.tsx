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
import { subjectsData, SubjectType } from '../../../constants/Data';
import { ListViewItem } from '../../../components/ListViewItem';
import Colors from '../../../constants/Colors';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getSubjectsByUserId } from '../../../services/subject';

export default function SubjectsScreen() {
  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();
  const [searchValue, setSearchValue] = useState('');
  const mockedSubjects = subjectsData;
  const [subjects, setSubjects] = useState<SubjectType[]>();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    (async () => {
      const result = await getSubjectsByUserId(1);
      setSubjects(result.subjects);
    })();
  }, []);

  const handleSearchInput = (text: string) => {
    setSearchValue(text);
    // Show list view on text
    const newItems: SubjectType[] = [];

    mockedSubjects.forEach((items) => {
      if (items.subject_title.toLowerCase().match(text.toLowerCase())) {
        newItems.push(items);
      }
    });
    if (text) {
      const filteredList = mockedSubjects.filter((subject: SubjectType) =>
        subject.subject_title.toLowerCase().includes(text.toLowerCase())
      );
      setSubjects(filteredList);
    } else {
      setSubjects(mockedSubjects);
    }
    setSubjects(newItems);
    console.log(subjects);
  };

  return (
    <View style={[styles.container]}>
      <View style={[{ flex: 1.5 }]}>
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
          keyExtractor={(item) => item.subject_id}
          data={subjects}
          renderItem={({ item }: { item: SubjectType }) => (
            <TouchableWithoutFeedback
              onPress={() => {
                router.push({
                  pathname: '/(tabs)/subjects/notes',
                  params: {
                    id: item.subject_id,
                    category: item.subject_category,
                    title: item.subject_title,
                    notes: JSON.stringify(item.notes),
                  },
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
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
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
