import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';

export default function App() {
  const [updateController, setUpdateController] = useState(false); 

  useEffect(() => {
    async function updateAPP () {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setUpdateController(true);
          const updateEnd = await Updates.fetchUpdateAsync();
          setUpdateController(false);
          await Updates.reloadAsync();
        } else {
          setUpdateController(false);
        }
      } catch (e) {
        Alert.alert(
          'Erro',
          `Erro ${e}`,
          [
              { text: 'OK' },
          ]
        );
        setUpdateController(false);
      }    
    }
    updateAPP();
  }, [])
  return (
    <View style={styles.container}>
      {updateController && 
        <>
          <ActivityIndicator size='large' color='green'/>
          <Text>Atualizando versão do APP...</Text>
        </>
      }
      {!updateController &&
        <>
        <Text>Atualização OTA</Text>
        <Text style={{color:'blue'}}>Versão 3.1</Text>
      </>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
