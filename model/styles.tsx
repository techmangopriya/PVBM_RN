import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  libraryText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginBottom: 15,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  selectedSegment: {
    backgroundColor: '#8B5CF6',
    borderRadius: 10,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  mediaIcon: {
    width: 18,
    height: 18,
    marginRight: 5,
  },
  mediaText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#8B5CF6',
  },
  videoDateText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'gray',
  },
  arrowIcon: {
    width: 15,
    height: 15,
    tintColor: 'gray',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'regular',
    marginBottom: 5,
    color: 'gray'
  }
});