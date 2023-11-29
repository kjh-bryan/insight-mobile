import React, { Component } from 'react';
import 'react-native-get-random-values';
import { Animated, StyleSheet, useColorScheme } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { SIZES } from '../../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
const Buffer = require('buffer').Buffer;
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import { CustomModal } from '../../components/Modal';
import { ThemeUtils } from '../../utils/ThemeUtils';
import { Audio } from 'expo-av';
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  IOSOutputFormat,
  Recording,
} from 'expo-av/build/Audio';
import { healthCheck, postSpeechToText } from '../../services/speechtotext';
import { SPEECH_SUBSCRIPTION_KEY, SERVICE_REGION } from '@env';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { createNotesBySubjectId } from '../../services/notes';
import { formatBytes } from '../../utils/UtilsFs';
import { LoadingModal } from '../../components/LoadingModal';
import { ActivityIndicator } from 'react-native-paper';
import { steps } from '../../utils/GenerateProgress';
import { SelectionModal } from '../../components/SelectionModal';
import { NewNoteModal } from '../../components/NewNoteModal';
import { createFlashcardBySubjectId } from '../../services/flashcards';

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const [recording, setRecording] = useState<Recording>();
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  const [document, setDocument] =
    useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [showLoadingModal, setLoadingModal] = useState(false);
  const [loadingModalTitle, setLoadingModalTitle] = useState('');
  const [loadingModalProgress, setLoadingModalProgress] = useState(0);
  const [showSelectionModal, setSelectionModal] = useState(false);
  const [showNewNoteModal, setNewNoteModal] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [currentSubject, setCurrentSubject] = useState(-1);
  const [noteTitle, setNoteTitle] = useState('');
  const [pdfText, setPdfText] = useState([]);

  const pickDocument = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      console.log(docRes);
      if (docRes.canceled != true) {
        setDocument(docRes.assets[0]);
        const title = docRes.assets[0].name.replace('.pdf', '');
        setNoteTitle(title);
      }
    } catch (err) {
      console.log('Error while selecting files ', err);
    }
  };
  const selectSubjectOrCreateNew = async () => {
    setSelectionModal(true);
    Animated.timing(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };

  const handleSetNoteTitle = async () => {
    console.log('handleCreateNewNote : noteTitle: ', noteTitle);
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectionModal(false);
      setNewNoteModal(true);
      Animated.timing(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start(() => {});
    });
  };

  const handleGenerateFlashcardProcess = async () => {
    Animated.timing(scaleValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setNewNoteModal(false);

      setLoadingModal(true);
      setLoadingModalProgress(progressStep);
      setLoadingModalTitle(steps[progressStep]);
      Animated.timing(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
      }).start(() => {
        setTimeout(() => handleCreateNote(progressStep), 2000);
      });
    });
  };
  const handleCreateNote = async (progress: number) => {
    console.log('handleCreateNote');
    console.log('progressStep : ', progressStep);
    const newProgress = progress + 1;

    const result = await createNotesBySubjectId(
      noteTitle,
      currentSubject,
      document?.uri
    );

    if (!result) {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setLoadingModal(false);
      });
    } else {
      console.log('newProgress : ', newProgress);
      setProgressStep(newProgress);
      console.log('After setNewProgress : ', newProgress);
      const modalProgress = (100 / steps.length / 100) * newProgress;
      setLoadingModalProgress(modalProgress);
      setLoadingModalTitle(steps[newProgress]);
      handleSendTextWithPromptGPT(newProgress, result.text);
    }
  };

  const handleSendTextWithPromptGPT = async (
    progress: number,
    text: string
  ) => {
    // Send text with prompt
    console.log('handleSendTextWithPromptGPT');
    console.log('progressStep : ', progressStep);
    const newProgress = progress + 1;
    console.log('newProgress : ', newProgress);
    setProgressStep(newProgress);
    console.log('After setNewProgress : ', newProgress);
    const modalProgress = (100 / steps.length / 100) * newProgress;
    setLoadingModalProgress(modalProgress);
    setLoadingModalTitle(steps[newProgress]);

    // const result = await getFrontBackTextFromGPT();

    console.log('After steps[newProgress] : ', steps[newProgress]);
    setTimeout(() => handleCreateFlashcard(progress, []), 2000);
  };

  const handleCreateFlashcard = async (progress: number, flashcards: []) => {
    console.log('handleCreateFlashcard');
    console.log('progressStep : ', progressStep);

    const result = await createFlashcardBySubjectId(currentSubject, flashcards);

    const newProgress = progress + 1;
    console.log('newProgress : ', newProgress);
    setProgressStep(newProgress);
    console.log('After setNewProgress : ', newProgress);
    const modalProgress = (100 / steps.length / 100) * newProgress;
    setLoadingModalProgress(modalProgress);
    setLoadingModalTitle(steps[newProgress]);
    console.log('After steps[newProgress] : ', steps[newProgress]);
    // For each text with front end back, structure them into each flashcard front and back
    //TODO
  };

  const getBufferFromUri = async (uri: string): Promise<Buffer> => {
    const utf8String = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
    });
    return Buffer.from(utf8String, 'base64');
  };

  const getFileName = (uri: string): string => {
    const urlComponents = uri.split('/');
    const fileNameAndExtension = urlComponents[urlComponents.length - 1];

    return fileNameAndExtension;
  };
  async function sttFromMic() {
    console.log(SPEECH_SUBSCRIPTION_KEY);
    console.log(SERVICE_REGION);
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      SPEECH_SUBSCRIPTION_KEY,
      SERVICE_REGION
    );
    const recordingURI = recording?.getURI();
    console.log('recordingURI: ', recordingURI);
    if (recordingURI != null) {
      const parsed = await getBufferFromUri(recordingURI);
      const fileName = getFileName(recordingURI);
      const audioConfig = sdk.AudioConfig.fromWavFileInput(parsed, fileName);
      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

      recognizer.recognizeOnceAsync((result) => {
        console.log('recognizeOnceAsync result: ', result);
        if (result.reason === sdk.ResultReason.RecognizedSpeech) {
          console.log(`RECOGNIZED: Text=${result.text}`);
        } else {
          console.log(
            'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.'
          );
        }
      });
    }
  }

  const recognizeWith = (
    reco: sdk.SpeechRecognizer,
    componentRef: Component
  ) => {
    // Note: this is how to process the result directly rather than subscribing to the recognized event
    // The continuation below shows how to get the same data from the final result as you'd get from the
    // events above.
    reco.recognizeOnceAsync(
      (result: any) => {
        // window.console.log(result);

        let noMatchDetail: sdk.NoMatchDetails;
        let cancelDetails: sdk.CancellationDetails;
        let eventText = `(continuation) Reason: ${
          sdk.ResultReason[result.reason]
        }`;
        switch (result.reason) {
          case sdk.ResultReason.RecognizedSpeech:
            eventText += ` Text: ${result.text}`;
            break;
          case sdk.ResultReason.NoMatch:
            noMatchDetail = sdk.NoMatchDetails.fromResult(result);
            eventText += ` NoMatchReason: ${
              sdk.NoMatchReason[noMatchDetail.reason]
            }`;
            break;
          case sdk.ResultReason.Canceled:
            cancelDetails = sdk.CancellationDetails.fromResult(result);
            eventText += ` CancellationReason: ${
              sdk.CancellationReason[cancelDetails.reason]
            }`;
            if (cancelDetails.reason === sdk.CancellationReason.Error) {
              eventText += `: ${cancelDetails.errorDetails}`;
            }
            break;
          default:
            break;
        }
        componentRef.setState((state: any) => ({
          events: `${state.events}${eventText}\n`,
          results: `${result.text}\n`,
          recognizing: false,
        }));

        console.log('eventText : ', eventText);
      },
      (err: any) => {
        componentRef.setState({ results: `ERROR: ${err}`, recognizing: false });
      }
    );
  };

  async function startRecording() {
    try {
      console.log('Requesting permissions..');

      // setShowModal(true);
      // Animated.timing(scaleValue, {
      //   toValue: 1,
      //   useNativeDriver: true,
      //   duration: 300,
      // }).start();
      // const recognizer = await sttFromMic();

      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          extension: '.wav',
          outputFormat: AndroidOutputFormat.MPEG_4,
          audioEncoder: AndroidAudioEncoder.AAC,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.wav',
          outputFormat: IOSOutputFormat.MPEG4AAC,
          audioQuality: IOSAudioQuality.MAX,
          sampleRate: 44100,
          numberOfChannels: 1,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
        web: {
          mimeType: 'audio/webm',
          bitsPerSecond: 128000,
        },
      });
      // await Audio.Recording.createAsync()
      //   .then((res) => {
      //     console.log('Print res at audio ', res);
      //   })
      //   .catch((error) => {
      //     console.log('Some error happen', error);
      //   });

      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording(status: boolean) {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording?.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    if (status) {
      sttFromMic();
      // const result = await postSpeechToText(recording);
      const recordingURI = recording?.getURI();
      console.log('Recording stopped and stored at', recordingURI);
      if (recordingURI != null) {
        // const fileBuf = await getBufferFromUri(recordingURI);
        // const file = await File;
        // const audioConfig = sdk.AudioConfig.fromWavFileInput(
        //   fileBuf,
        //   recording
        // );
      }
      // if (result) {
      //   console.log('result exist');
      //   console.log(result);
      // }
    } else {
      console.log('Recording stopped.');
    }
  }

  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();

  return (
    <View style={[styles.container, themeBackgroundStyle]}>
      <View style={[styles.titleHeader, themeBackgroundStyle]}>
        <Text style={[styles.title, themeTextStyle]}>
          Select an <Text style={styles.titleColor}>Option</Text>
        </Text>
      </View>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        scaleValue={scaleValue}
        stopFunction={stopRecording}
      >
        <FontAwesome name="volume-up" color={Colors.light.primary} size={50} />
      </CustomModal>
      <LoadingModal
        showModal={showLoadingModal}
        setShowModal={setLoadingModal}
        scaleValue={scaleValue}
        stopFunction={stopRecording}
        displayText={loadingModalTitle}
        progress={loadingModalProgress}
      >
        <ActivityIndicator
          animating={true}
          color={Colors.default.primary}
          size={'large'}
        />
      </LoadingModal>
      <SelectionModal
        showModal={showSelectionModal}
        setShowModal={setSelectionModal}
        scaleValue={scaleValue}
        setSubject={setCurrentSubject}
        handleModalDismiss={handleSetNoteTitle}
      />
      <NewNoteModal
        showModal={showNewNoteModal}
        scaleValue={scaleValue}
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        handleModalDismiss={handleGenerateFlashcardProcess}
      />
      <View style={[styles.hugeButtonContainer, themeBackgroundStyle]}>
        <TouchableOpacity
          style={[styles.hugeButton, themeSecondaryBackgroundStyle]}
          onPress={() => {
            setShowModal(true);
            Animated.timing(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
              duration: 300,
            }).start();
            startRecording();
          }}
        >
          <>
            <FontAwesome
              name="microphone"
              style={styles.hugeButtonIcon}
              color={Colors.light.primary}
            />
            <Text style={styles.hugeButtonLabel}>Listen to Lecture</Text>
          </>
        </TouchableOpacity>
      </View>
      <View style={[styles.hugeButtonContainer, themeBackgroundStyle]}>
        <TouchableOpacity
          style={[styles.hugeButton, themeSecondaryBackgroundStyle]}
          onPress={() => {
            pickDocument();
          }}
        >
          <MaterialIcons
            name="file-download"
            style={styles.hugeButtonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.hugeButtonLabel}>Import Lecture Notes</Text>
        </TouchableOpacity>
      </View>

      {document && document.size && document.name && (
        <View style={[styles.uploadFileContainer, themeBackgroundStyle]}>
          <View style={[styles.uploadFile, themeBackgroundStyle]}>
            <View style={[styles.uploadFileIcon, themeBackgroundStyle]}>
              <Ionicons name="document-text" style={styles.fileIcon} />
            </View>
            <View style={[styles.uploadFileDescription, themeBackgroundStyle]}>
              <Text style={[themeTextStyle]}>{document.name}</Text>
              <Text style={[styles.fileDescriptionSubtitle, themeTextStyle]}>
                {formatBytes(document.size)}
              </Text>
            </View>
            <View
              style={[styles.uploadFileGenerateButton, themeBackgroundStyle]}
            >
              <TouchableOpacity
                style={styles.generateButton}
                onPress={async () => {
                  selectSubjectOrCreateNew();
                }}
              >
                <Text style={[styles.generateButtonText]} weight="bold">
                  Generate Flashcard
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.uploadFileCancel, themeBackgroundStyle]}>
              <TouchableOpacity
                onPress={() => {
                  setDocument(null);
                }}
              >
                <Entypo name="cross" style={styles.fileCancel} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.h1,
  },
  titleColor: {
    fontSize: SIZES.h1,
    color: Colors.light.primary,
  },
  hugeButtonContainer: {
    marginTop: SIZES.marginTop,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hugeButton: {
    height: SIZES.height / 4,
    width: SIZES.width - SIZES.sidePadding * 2,
    padding: SIZES.padding,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  hugeButtonIcon: {
    fontSize: 50,
    flex: 0.5,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  hugeButtonLabel: {
    fontSize: SIZES.h1 - 2,
    color: Colors.light.primary,
    alignSelf: 'center',
    textAlignVertical: 'center',
    flex: 0.5,
  },
  uploadFileContainer: {
    marginTop: SIZES.marginTop,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  uploadFile: {
    height: SIZES.height / 7,
    width: SIZES.width - SIZES.sidePadding * 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
  },
  uploadFileIcon: {
    justifyContent: 'center',
  },
  fileIcon: {
    fontSize: 50,
    color: Colors.light.primary,
    alignSelf: 'center',
  },
  uploadFileDescription: {
    flex: 0.8,
    marginTop: SIZES.padding / 2,
    marginLeft: SIZES.padding / 2,
  },
  fileDescriptionSubtitle: {
    marginTop: SIZES.padding / 4,
  },
  uploadFileGenerateButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  generateButton: {
    backgroundColor: Colors.light.primary,
    padding: SIZES.base,
    borderRadius: 4,
  },
  generateButtonText: {
    color: Colors.dark.text,
  },
  uploadFileCancel: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  fileCancel: {
    fontSize: 20,
    color: Colors.light.slate500,
  },
});
