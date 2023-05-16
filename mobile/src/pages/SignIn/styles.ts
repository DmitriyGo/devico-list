import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '80%',
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 16,
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: -8,
    marginBottom: 8,
  },
})
