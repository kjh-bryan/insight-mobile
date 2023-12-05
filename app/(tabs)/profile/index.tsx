import {
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { imagesDataURL } from '../../../constants/Data';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import EditScreenInfo from '../../../components/EditScreenInfo';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { Text, View } from '../../../components/Themed';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getNotesByUserId } from '../../../services/notes';
import { getFlashcardsByUserId } from '../../../services/flashcards';
import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { getQuizzesByUserId } from '../../../services/quiz';
import Animated from 'react-native-reanimated';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();

  const [numberOfQuiz, setNumberOfQuiz] = useState(0);
  const [numberOfSubject, setNumberOfSubject] = useState(0);
  const [numberOfFlashcard, setNumberOfFlashcard] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const [subjectSection, setSubjectSection] = useState([]);

  const { userId, username } = useSelector((state: RootState) => state.user);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);

  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const testContent = () => {
    return <Button>Testing</Button>;
  };
  const renderHeader = (section: any, _: any, isActive: any) => {
    return (
      <View style={[styles.header, isActive ? styles.active : styles.inactive]}>
        <Text>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: any, _: any, isActive: any) => {
    return (
      <View
        style={[styles.content, isActive ? styles.active : styles.inactive]}
      >
        <Text>{section.content}</Text>
      </View>
    );
  };
  useEffect(() => {
    (async () => {
      const quizResult = await getQuizzesByUserId(Number(userId));
      const notesResult = await getNotesByUserId(Number(userId));
      const flashcardResult = await getFlashcardsByUserId(Number(userId));
      setNumberOfQuiz(Object.keys(quizResult.subjects).length);
      setNumberOfSubject(Object.keys(notesResult.subjects).length);
      setNumberOfFlashcard(Object.keys(flashcardResult.subjects).length);
      setQuizzes(quizResult.subjects);

      const SECTION = quizResult.subjects.map((quiz: any) => ({
        title: quiz.subject_title,
        content: <Button>Test</Button>,
      }));
      setSubjectSection(SECTION);
    })();
  }, []);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push({ pathname: '/(access)/login' });
  };

  const showConfirmDialog = () => {
    return Alert.alert('Are your sure?', 'Are you sure you want to sign out?', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => {
          handleLogout();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.title, themeTextStyle]}>Hello,</Text>
      <Text style={styles.titleColor}>{username.toUpperCase()}</Text>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Text style={styles.boxNumber}>{numberOfQuiz}</Text>
          <Text style={styles.boxTitle}>Quizzes</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxNumber}>{numberOfSubject}</Text>
          <Text style={styles.boxTitle}>Subjects</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxNumber}>{numberOfFlashcard}</Text>
          <Text style={styles.boxTitle}>Flash</Text>
          <Text style={styles.boxTitle}>cards</Text>
        </View>
      </View>
      <View>
        <Text>Your Quiz</Text>
      </View>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.boxContainer}>
          {/* <View style={styles.box}>
            <Text style={styles.boxNumber}>{numberOfQuiz}</Text>
            <Text style={styles.boxTitle}>Completed</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxNumber}>{numberOfQuiz}</Text>
            <Text style={styles.boxTitle}>Quizzes</Text>
          </View> */}
          {/* {quizzes &&
            quizzes.map((quiz: any) => {
              return (
                <View style={{ flex: 1 }}>
                  <Text>Subject : {quiz.subject_title}</Text>
                </View>
              );
            })} */}
        </View>
        <Collapsible collapsed={collapsed} align='center'>
          <View style={styles.content}>
            <Text>
              Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
              ribs
            </Text>
          </View>
        </Collapsible>
        <Accordion
          activeSections={activeSections}
          sections={subjectSection}
          touchableComponent={TouchableOpacity}
          expandMultiple={multipleSelect}
          renderHeader={renderHeader}
          renderContent={renderContent}
          duration={400}
          onChange={setSections}
          renderAsFlatList={false}
        />
      </ScrollView>
      <Button
        style={[styles.editButton]}
        mode='contained'
        onPress={() => {
          router.push({ pathname: '/(tabs)/profile/edit' });
        }}
      >
        <Text style={[styles.editButtonText]}>Edit Profile</Text>
      </Button>
      <Button
        style={[styles.logoutButton]}
        mode='contained'
        onPress={() => {
          showConfirmDialog();
        }}
      >
        <Text style={[styles.logoutButtonText]}>Sign Out</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: SIZES.h2,
  },
  titleColor: {
    fontSize: SIZES.h1,
    color: Colors.light.primary,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  box: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 16,
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  boxNumber: {
    fontSize: 24,
    marginTop: 8,
  },
  editButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: Colors.default.primary,
  },
  editButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logoutButton: {
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  logoutButtonText: {
    color: Colors.default.primary,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
});
