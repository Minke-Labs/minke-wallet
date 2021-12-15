import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#F2EAE1',
  },
  backupWordContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  backupWordNumberPadding: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12
  },
  backupWordNumber: {
    color: '#006AA6',
    fontWeight: 'bold'
  }
});
