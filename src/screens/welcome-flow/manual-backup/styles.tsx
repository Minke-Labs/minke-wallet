import { Dimensions, StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#F2EAE1',
  },
  headline: {
    fontWeight: '800',
    fontSize: 24,
    color: '#213952',
    marginBottom: 16
  },
  subheading: {
    fontSize: 16,
    fontWeight: '500',
    color: '#213952'
  },
  backupWordContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 40
  },
  backupWordItem : {
    flexBasis: '50%',
    marginBottom: 16
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
  },
  backupWordPadding: {
    paddingLeft: 12,
    color: '#213952',
    flex: 1,
    justifyContent: 'center'
  },
  copyPastButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16
  },
  imageCopyPast: {
    marginRight: 16,
    width: 16,
    height: 16
  }
});
