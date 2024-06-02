import {StyleSheet} from 'react-native';

import {Text, View} from '@/components/Themed';

import {useSession} from '@/hooks/useSession';
export default function Profile() {
  const {signOut} = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProfileScreen</Text>
      <Text
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
