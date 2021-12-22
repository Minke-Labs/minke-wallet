import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  headerImage: {
    resizeMode: 'cover',
    width: 250,
    marginLeft: -40,
    marginBottom: 32,
    zIndex: 10
  },
  backgroundTop: {
    position: 'absolute',
    top: 16,
    right: -8,
    zIndex: 0
  },
  backgroundBottom: {
    position: 'absolute',
    bottom: 0,
    right: -8,
    zIndex: -1
  },
  content: {
    padding: 32,
    position: 'relative'
  },
  textBold: {
    fontWeight: 'bold'
  }
});
