import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

/**
 * Safe wrapper for GooglePlacesAutocomplete that handles undefined filter errors
 * Ensures all array props are properly initialized to prevent filter errors
 */
const SafeGooglePlacesAutocomplete = (props) => {
  // Ensure all array props that might be filtered are initialized
  const safeProps = {
    ...props,
    // Critical: Ensure predefinedPlaces is always an array
    predefinedPlaces: Array.isArray(props.predefinedPlaces) 
      ? props.predefinedPlaces 
      : [],
    predefinedPlacesAlwaysVisible: props.predefinedPlacesAlwaysVisible ?? false,
    // Ensure filterReverseGeocodingByTypes is an array
    filterReverseGeocodingByTypes: Array.isArray(props.filterReverseGeocodingByTypes)
      ? props.filterReverseGeocodingByTypes
      : [],
    // Default values for other props
    enablePoweredByContainer: props.enablePoweredByContainer ?? false,
    debounce: props.debounce || 400,
    minLength: props.minLength || 2,
    fetchDetails: props.fetchDetails ?? true,
    listViewDisplayed: props.listViewDisplayed || 'auto',
    suppressDefaultStyles: props.suppressDefaultStyles ?? false,
    keepResultsAfterBlur: props.keepResultsAfterBlur ?? true,
    // Ensure textInputProps has onChangeText
    textInputProps: {
      ...props.textInputProps,
      onChangeText: (text) => {
        const safeText = text || '';
        if (props.textInputProps?.onChangeText) {
          props.textInputProps.onChangeText(safeText);
        }
      },
    },
    // Error handlers
    onFail: (error) => {
      console.error('GooglePlacesAutocomplete Error:', error);
      if (props.onFail) {
        props.onFail(error);
      }
    },
    onNotFound: () => {
      if (props.onNotFound) {
        props.onNotFound();
      }
    },
  };

  return <GooglePlacesAutocomplete {...safeProps} />;
};

export default React.memo(SafeGooglePlacesAutocomplete);

