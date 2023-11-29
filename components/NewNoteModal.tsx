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
import { TextInput } from 'react-native-paper';

type NewNoteModalProps = {
  showModal: boolean;
  setNoteTitle: React.Dispatch<React.SetStateAction<string>>;
  noteTitle: string;
  scaleValue?: any;
  handleModalDismiss?: () => void;
};

export function NewNoteModal({
  scaleValue,
  showModal,
  setNoteTitle,
  noteTitle,
  handleModalDismiss,
}: NewNoteModalProps) {
  const { themeBackgroundStyle } = ThemeUtils();

  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log('noteTitle ', noteTitle);
    setErrors({});
    validateForm();
  }, [noteTitle]);

  const validateForm = () => {
    const errors = {} as any;

    if (!noteTitle) {
      errors.newNoteTitleMessage = 'Note Title is required';
    }

    setErrors(errors);
    setIsFormValid(
      errors !== undefined && errors ? Object.keys(errors).length === 0 : false
    );
  };

  const handleSetNoteTitle = async (note_title: string) => {
    setNoteTitle(note_title);

    if (handleModalDismiss) handleModalDismiss();
  };

  const handleCreateNote = async () => {
    if (isFormValid) {
      console.log('Submitted form, creating subject');

      handleSetNoteTitle(noteTitle);
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
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: SIZES.h2 - 4,
              }}
            >
              New Note
            </Text>
            <TextInput
              style={{ marginBottom: SIZES.base }}
              label="Note Title"
              value={noteTitle}
              mode="outlined"
              theme={{ roundness: 10 }}
              outlineColor={Colors.default.slate600}
              selectionColor={Colors.default.primary}
              activeOutlineColor={Colors.default.slate600}
              activeUnderlineColor={Colors.default.slate600}
              onChangeText={(note) => setNoteTitle(note)}
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
                  handleCreateNote();
                }}
              >
                <Text
                  style={{ fontSize: SIZES.h3, color: Colors.default.white }}
                >
                  Create Note
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
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
    paddingHorizontal: 30,
    paddingVertical: 20,
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

  error: {
    color: Colors.default.complementRed,
    fontSize: SIZES.h3,
    marginTop: 6,
  },
});
