import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text } from './Themed';
import { ThemeUtils } from '../utils/ThemeUtils';
import {
  createSubjectByUserId,
  getSubjectsByUserId,
} from '../services/subject';
import { ScrollView } from 'react-native-gesture-handler';
import { RadioButton, TextInput } from 'react-native-paper';
import { SubjectType } from '../constants/Data';
import { Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
type SelectionModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactElement;
  setSubject: React.Dispatch<React.SetStateAction<number>>;
  scaleValue?: any;
  handleModalDismiss?: () => void;
};

export function SelectionModal({
  scaleValue,
  showModal,
  setShowModal,
  setSubject,
  children,
  handleModalDismiss,
}: SelectionModalProps) {
  const {
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
    themeTextStyle,
  } = ThemeUtils();

  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [choice, setChoice] = useState('');
  const [subjectTitle, setSubjectTitle] = useState('');
  const [subjectCategory, setSubjectCategory] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const getSubjects = await getSubjectsByUserId(1);
      const subject = getSubjects;
      setSubjects(subject.subjects);
      console.log('Check for undefined subjects', typeof subjects);
      if (subjects !== null && subjects.length > 0) {
        setChoice(subjects[0].subject_id);
      } else {
        console.log(subjects);
      }
      console.log('end');
    })();
  }, [isFocused]);

  useEffect(() => {
    setErrors({});
    validateForm();
  }, [subjectTitle, subjectCategory]);

  const validateForm = () => {
    const errors = {} as any;
    if (!subjectTitle) {
      errors.subjectTitleMessage = 'Subject Title is required';
    }

    if (!subjectCategory) {
      errors.subjectCategoryMessage = 'Subject Category is required';
    }

    setErrors(errors);
    setIsFormValid(
      errors !== undefined && errors ? Object.keys(errors).length === 0 : false
    );
  };

  const handleSetSubject = async (subject_id: number) => {
    setSubject(subject_id);

    if (handleModalDismiss) handleModalDismiss();
  };

  const handleCreateSubject = async () => {
    if (isFormValid) {
      console.log('Submitted form, creating subject');
      const result = await createSubjectByUserId(
        subjectTitle,
        subjectCategory,
        1
      );
      setSubjectTitle('');
      setSubjectCategory('');
      handleSetSubject(result.subject_id);
    } else {
      console.log("Form is invalid, can't create subject");
    }
  };
  return (
    <Modal
      transparent
      visible={showModal}
      onDismiss={() => {
        console.log('[Selection Modal dismissed');
      }}
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContainer,
            themeBackgroundStyle,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.modalTopContainer}>
              <View style={{ height: 24, width: 24, alignSelf: 'flex-end' }}>
                <Entypo
                  name="cross"
                  size={24}
                  color={Colors.default.slate600}
                  onPress={() => {
                    setSubject(-1);
                    setTimeout(() => setShowModal(false), 200);
                    Animated.timing(scaleValue, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start();
                  }}
                />
              </View>
              <View style={{ alignItems: 'center' }}></View>
              <View style={{ alignItems: 'center' }}>
                {children && children}
              </View>
              <Text style={[styles.modalSubtitle, themeTextStyle]}>
                Select a Subject
              </Text>
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                automaticallyAdjustKeyboardInsets={true}
              >
                <View
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 10,
                    borderColor: Colors.default.slate500,
                    flexGrow: 1,
                  }}
                >
                  <RadioButton.Group
                    value={choice}
                    onValueChange={(choice) => setChoice(choice)}
                  >
                    {subjects &&
                      subjects !== undefined &&
                      subjects.map((subject: any) => {
                        return (
                          <RadioButton.Item
                            color={
                              choice === subject.subject_id
                                ? Colors.default.white
                                : Colors.default.primary
                            }
                            uncheckedColor={Colors.default.slate500}
                            label={`${subject.subject_title} \n${subject.subject_category}`}
                            style={
                              choice === subject.subject_id
                                ? styles.selectedChoiceContainer
                                : styles.choiceContainer
                            }
                            value={subject.subject_id}
                            key={subject.subject_id}
                            labelStyle={
                              choice === subject.subject_id
                                ? styles.selectedChoiceLabel
                                : styles.choiceLabel
                            }
                          />
                        );
                      })}
                  </RadioButton.Group>
                </View>
              </ScrollView>
              <View
                style={{
                  alignItems: 'center',
                  flexGrow: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    paddingVertical: SIZES.base,
                    paddingHorizontal: SIZES.base,
                    backgroundColor: Colors.default.primary,
                    borderRadius: SIZES.base,
                    width: '80%',
                    alignItems: 'center',
                    opacity: choice !== '' ? 1 : 0.5,
                  }}
                  disabled={
                    subjects === undefined || subjects === null || choice === ''
                      ? true
                      : false
                  }
                  onPress={() => {
                    handleSetSubject(Number(choice));
                  }}
                >
                  <Text
                    style={{ fontSize: SIZES.h3, color: Colors.default.white }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.modalBottomContainer}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: 'black' }}
                />
                <View>
                  <Text style={{ width: 50, textAlign: 'center' }}>Or</Text>
                </View>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: 'black' }}
                />
              </View>
            </View>
            <View style={styles.modalCreateNewSubjectContainer}>
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: SIZES.base,
                  fontSize: SIZES.h2 - 4,
                }}
              >
                New Subject
              </Text>
              <TextInput
                style={{ marginBottom: SIZES.base }}
                label="Subject Title"
                value={subjectTitle}
                mode="outlined"
                theme={{ roundness: 10 }}
                outlineColor={Colors.default.slate600}
                selectionColor={Colors.default.primary}
                activeOutlineColor={Colors.default.slate600}
                activeUnderlineColor={Colors.default.slate600}
                onChangeText={(subjectTitle) => setSubjectTitle(subjectTitle)}
              />

              <TextInput
                style={{ marginBottom: SIZES.base }}
                label="Subject Category"
                value={subjectCategory}
                mode="outlined"
                theme={{ roundness: 10 }}
                outlineColor={Colors.default.slate600}
                selectionColor={Colors.default.primary}
                activeOutlineColor={Colors.default.slate600}
                activeUnderlineColor={Colors.default.slate600}
                onChangeText={(subjectCategory) =>
                  setSubjectCategory(subjectCategory)
                }
              />
              <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    paddingVertical: SIZES.base,
                    paddingHorizontal: SIZES.base,
                    backgroundColor: Colors.default.primary,
                    borderRadius: SIZES.base,
                    width: '80%',
                    alignItems: 'center',
                    opacity: isFormValid ? 1 : 0.5,
                  }}
                  disabled={!isFormValid}
                  onPress={() => {
                    handleCreateSubject();
                  }}
                >
                  <Text
                    style={{ fontSize: SIZES.h3, color: Colors.default.white }}
                  >
                    Create Subject
                  </Text>
                </TouchableOpacity>
                {errors !== undefined &&
                  errors &&
                  Object.values(errors).map((error: any, index) => (
                    <Text key={index} style={styles.error}>
                      {error}
                    </Text>
                  ))}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
    paddingHorizontal: 20,
  },
  modalTopContainer: {
    flex: 0.5,
    paddingTop: 30,
  },
  modalBottomContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: Colors.light.slate500,
    paddingHorizontal: SIZES.base,
    paddingBottom: SIZES.padding - 4,
    flex: 0.05,
    justifyContent: 'center',
  },
  closeModal: {
    fontSize: 20,
    color: Colors.light.slate500,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalSubtitle: {
    fontSize: SIZES.h2 - 4,
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.light.slate600,
  },
  modalButton: {
    flex: 0.5,
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalButtonRightSeparator: {
    borderRightColor: Colors.light.slate500,
    borderRightWidth: 0.5,
  },
  modalButtonLeftSeparator: {
    borderLeftColor: Colors.light.slate500,
    borderLeftWidth: 0.5,
  },
  buttonLabel: {
    fontSize: SIZES.h2 - 2,
  },
  buttonLabelLeftColor: {
    color: Colors.light.slate600,
  },
  buttonLabelRightColor: {
    color: Colors.light.primary,
  },
  progressBar: {
    marginVertical: 4,
  },
  progressDesc: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: SIZES.h3 + 2,
  },
  choiceContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderColor: Colors.default.primary,
    color: 'green',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedChoiceContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: Colors.default.primary,
    borderRadius: 10,
    marginBottom: 10,
  },
  choiceLabel: {
    color: Colors.default.slate600,
    fontSize: SIZES.h4,
    fontFamily: 'OpenSans_400Regular',
  },
  selectedChoiceLabel: {
    color: Colors.default.white,
    fontSize: SIZES.h4,
    fontFamily: 'OpenSans_400Regular',
  },

  modalCreateNewSubjectContainer: {
    flex: 0.45,
  },
  error: {
    color: Colors.default.complementRed,
    fontSize: SIZES.h3,
    marginTop: 6,
  },
});
