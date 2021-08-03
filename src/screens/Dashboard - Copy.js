import React from 'react';
import { SafeAreaView,TextInput,Button,Alert, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Input, Block,NavBar,DeckSwiper  } from 'galio-framework';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d74',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d75',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d76',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    
    <TextInput
        style={styles.input}
        keyboardType="number-pad"
      />
      <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
  </View>
);

const Dashboard = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
    <Item title={item.title} />
 
    
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
        <NavBar   title="Prduct Search"/>
        
        <TextInput
        style={styles.input}
        keyboardType="number-pad"
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    border:'black';
  }
});

export default Dashboard;