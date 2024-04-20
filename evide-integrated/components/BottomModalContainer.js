import React, { useCallback, useMemo, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  Image,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const windowHeight = Dimensions.get("window").height;

export default BottomModalContainer = ({ navigation, children }) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "78%"], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []); // Present modal when component mounts

  const handlePresentModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleContentPanning = useCallback(
    (event, gestureState, fromIndex, toIndex) => {
      // Prevent the modal from going below 25%
      if (toIndex < 0) {
        return false;
      }
      return true;
    },
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.modalButtonContainer}>
        <Button title="Explore" onPress={handlePresentModal} />
      </View>
      <View style={styles.BottomSheetContainer}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          enableContentPanning={handleContentPanning} // Apply the custom content panning handler
        >
          {children}
        </BottomSheetModal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonContainer: {
    top: '60vh', // Adjust the margin bottom to position the button lower
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 20,
  },
  BottomSheetContainer: {},
});
