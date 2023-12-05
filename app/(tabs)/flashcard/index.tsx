import { Dimensions, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Text, View } from '../../../components/Themed';
import { SIZES } from '../../../constants/Theme';
import {
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { SubjectFlashcardType, SubjectType } from '../../../constants/Data';
import Colors from '../../../constants/Colors';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { getFlashcardsByUserId } from '../../../services/flashcards';
import { DeckListViewItem } from '../../../components/DeckListViewItem';
import { MainScreenLoader } from '../../../components/MainScreenLoader';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

export default function FlashcardScreen() {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [subjects, setSubjects] = useState<SubjectFlashcardType[]>();
  const [unfilteredSubjects, setUnfilteredSubjects] =
    useState<SubjectFlashcardType[]>();
  const isFocused = useIsFocused();

  const { userId } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    (async () => {
      const result = await getFlashcardsByUserId(Number(userId));
      console.log('Flashcard Screen result :', result);
      // console.log('result.subjects : ', result.subjects);
      console.log('result.subjects : ', result.subjects[0].flashcards);
      setSubjects(result.subjects);
      setUnfilteredSubjects(result.subjects);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, [isFocused]);

  const handleSearchInput = (text: string) => {
    setSearchValue(text);
    // Show list view on text
    const newItems: SubjectType[] = [];

    if (subjects)
      subjects.forEach((items) => {
        if (items.subject_title.toLowerCase().match(text.toLowerCase())) {
          newItems.push(items);
        }
      });
    if (subjects)
      if (text) {
        const filteredList = subjects.filter((subject: SubjectFlashcardType) =>
          subject.subject_title.toLowerCase().includes(text.toLowerCase())
        );
        setSubjects(filteredList);
      } else {
        setSubjects(unfilteredSubjects);
      }
    setSubjects(newItems);
    console.log(subjects);
  };

  return (
    <View style={[styles.container]}>
      <View style={[{ flex: 1.5 }]}>
        <Text style={[styles.headerTitle]}>Flashcard</Text>
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          placeholder="Search"
          onChangeText={(text) => handleSearchInput(text)}
        />
      </View>
      <View style={{ flex: 7 }}>
        {/* List View */}
        {loading ? (
          <MainScreenLoader />
        ) : (
          <FlatList
            keyExtractor={(item) => item.subject_id}
            data={subjects}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log('tocuhanle print item :', item);
                  console.log('tocuhanle print flashcards :', item.flashcards);
                  console.log(
                    'tocuhanle print json flashcards :',
                    JSON.stringify(item.flashcards)
                  );
                  router.push({
                    pathname: '/(tabs)/flashcard/decks',
                    params: {
                      subject_id: item.subject_id,
                      subject_category: item.subject_category,
                      subject_title: item.subject_title,
                    },
                  });
                }}
              >
                <DeckListViewItem item={item} />
              </TouchableWithoutFeedback>
            )}
          />
        )}
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
