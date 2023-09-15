import { StyleSheet } from 'react-native';

export const marker_width = 5
export const DefaultStyles = StyleSheet.create({
    MarkerWrapper: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 5,
    },
    Marker: {
        height: marker_width,
        width: marker_width,
        borderRadius: 50
    },
    Today: {
        color: 'dodgerblue'
    },
    Selected: {
        color: 'white',
    },
    SelectedWrapper: {
        backgroundColor: 'dodgerblue',
        borderRadius: 50,
    }
});