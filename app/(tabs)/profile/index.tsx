import {
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  Alert,
  Dimensions,
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
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { useIsFocused } from '@react-navigation/native';
import { ContributionGraph } from 'react-native-chart-kit';
import { QuizProgressChart } from '../../../components/QuizProgressChart';
import { ProfileScreenLoader } from '../../../components/ProfileScreenLoader';

const screenWidth = Dimensions.get('window').width - SIZES.padding * 4;

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

  const [loading, setLoading] = useState(true);
  const { userId, username } = useSelector((state: RootState) => state.user);
  const [activeSections, setActiveSections] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [multipleSelect, setMultipleSelect] = useState(false);
  const [quizAttemptData, setQuizAttemptData] = useState<
    { date: string; count: number }[]
  >([]);

  const isFocused = useIsFocused();
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };
  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };
  const testContent = () => {
    return <Button>Testing</Button>;
  };
  const getLastDateOfMonth = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Note: Months are zero-based in JavaScript

    // Calculate the first day of the next month and then subtract one day
    const lastDate = new Date(year, month, 0);

    // Format the date to "YYYY-MM-DD"
    const formattedDate = `${lastDate.getFullYear()}-${(lastDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${lastDate.getDate().toString().padStart(2, '0')}`;

    return formattedDate;
  };

  // Example usage
  const chartConfig = {
    backgroundColor: Colors.default.primary,
    backgroundGradientFrom: '#093D65',
    backgroundGradientTo: '#14699E',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
    },
  };
  const renderHeader = (section: any, _: any, isActive: any) => {
    return (
      <View
        style={[
          styles.headerContent,
          isActive ? styles.headerActive : styles.headerInactive,
        ]}
      >
        <Text
          style={{
            color: isActive ? Colors.default.primary : Colors.default.white,
          }}
        >
          {section.title}
        </Text>
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

      console.log('subjects at profile : ', quizResult.subjects[0]);
      const attemptData: { date: string; count: number }[] = [];
      for (let i = 0; i < quizResult.subjects.length; i++) {
        console.log('in loop : ');
        for (let j = 0; j < quizResult.subjects[i].quizzes.length; j++) {
          console.log('print attempt : ');
          console.log(quizResult.subjects[i].quizzes[j].attempts);

          if (quizResult.subjects[i].quizzes[j].attempts.length > 0) {
            for (
              let k = 0;
              k < quizResult.subjects[i].quizzes[j].attempts.length;
              k++
            ) {
              const date =
                quizResult.subjects[i].quizzes[j].attempts[k].created_at;
              const formattedDate = date.split('T')[0];
              const index = attemptData.findIndex((entry) =>
                entry.date.match(formattedDate)
              );
              if (index !== -1) {
                // Date exists, increment count
                attemptData[index].count += 1;
              } else {
                // Date does not exist, add a new entry
                attemptData.push({ date: formattedDate, count: 1 });
              }
            }
          }
        }
      }
      setQuizAttemptData(attemptData);
      console.log('attempt data : ', attemptData);
      const SECTION = quizResult.subjects.map((quiz: any) => ({
        title: quiz.subject_title,
        content: <QuizProgressChart quizzes={quiz.quizzes} />,
      }));
      setSubjectSection(SECTION);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, [isFocused]);

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
  const handleToolTip: any = {};
  const toolTip = (item: any) => {
    console.log('item ', item);
    const date = new Date(item.date);
    Alert.alert(
      `${item.count} Quiz Attempted on`,
      `${date.toDateString()}`,
      [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  return (
    <View style={[styles.container, { paddingBottom: 10 }]}>
      {loading ? (
        <ProfileScreenLoader />
      ) : (
        <View style={{ flex: 0.7, flexGrow: 1 }}>
          <Text style={[styles.title, themeTextStyle]}>Hello,</Text>
          <Text style={styles.titleColor}>{username.toUpperCase()}</Text>

          <ScrollView contentInsetAdjustmentBehavior='automatic'>
            <View style={{ marginTop: SIZES.padding }}>
              <Text style={{}} weight='medium'>
                Your Activity Graph
              </Text>
            </View>
            <View style={[styles.boxContainer]}>
              <ContributionGraph
                tooltipDataAttrs={(value: any) => {
                  return { rx: value.count ? 10 : 2, ry: value.count ? 10 : 2 };
                }}
                values={quizAttemptData}
                endDate={new Date(getLastDateOfMonth())}
                numDays={71}
                width={screenWidth}
                height={220}
                gutterSize={2}
                chartConfig={chartConfig}
                style={{ flex: 1 }}
                onDayPress={(item) => toolTip(item)}
              />
            </View>
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
              <Text weight='medium'>Your Quiz Statistic</Text>
            </View>
            <View style={styles.boxContainer}>
              <View style={[styles.box]}>
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
              </View>
            </View>
            <View style={{ paddingHorizontal: SIZES.padding }}>
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
          </ScrollView>
        </View>
      )}
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
    paddingVertical: 5,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  logoutButtonText: {
    color: Colors.default.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  headerActive: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderToCpolor: Colors.default.primary,
    borderLeftColor: Colors.default.primary,
    borderRightColor: Colors.default.primary,
    borderBottomColor: Colors.default.slate300,
    borderBottomWidth: 0.5,
  },
  headerInactive: {
    backgroundColor: Colors.default.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.default.white,
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
    borderColor: Colors.default.primary,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
    borderWidth: 1,
  },
  header: {
    backgroundColor: Colors.default.primary,
    padding: 10,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'red',
  },
});
