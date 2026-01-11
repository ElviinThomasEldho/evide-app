import React, { useCallback, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { CONFIG } from '../constants/config';

/**
 * BottomModalContainer component - manages bottom sheet modal display
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to display in modal
 * @param {string} props.buttonTitle - Title for the modal trigger button
 */
const BottomModalContainer = ({ children, buttonTitle }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => CONFIG.MODAL_SNAP_POINTS, []);

  useEffect(() => {
    // Present modal when component mounts
    bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleContentPanning = useCallback(
    (event, gestureState, fromIndex, toIndex) => {
      // Prevent the modal from going below first snap point
      if (toIndex < 0) {
        return false;
      }
      return true;
    },
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.bottomSheetContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          enableContentPanning={handleContentPanning}
          enablePanDownToClose={false}
          backgroundStyle={styles.modalBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              contentContainerStyle={styles.scrollContent}
            >
              {children}
            </ScrollView>
          </View>
        </BottomSheetModal>
        
        <Pressable
          style={({ pressed }) => [
            styles.modalButton,
            pressed && styles.modalButtonPressed
          ]}
          onPress={handlePresentModal}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        >
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheetContainer: {
    position: "relative",
  },
  modalBackground: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handleIndicator: {
    backgroundColor: "#CCCCCC",
    width: 40,
  },
  modalContent: {
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollContent: {
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  modalButton: {
    borderRadius: 30,
    backgroundColor: "#2675EC",
    height: 48,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default React.memo(BottomModalContainer);
