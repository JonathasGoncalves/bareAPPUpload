import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native';

export default function App() {
  const [updateController, setUpdateController] = useState(false); 
  //const [alertCheck, setAlertCheck] = useState(false);

  useEffect(() => {
    async function updateAPP () {

      Alert.alert(
        'updateAPP',
        'Na função',
        [
            { text: 'OK' },
        ]
      );

      setUpdateController(true);

      try {
        const update = await Updates.checkForUpdateAsync();
        Alert.alert(
          'checkForUpdateAsync',
          `Possui updates? ${update.isAvailable}`,
          [
              { text: 'OK' },
          ]
        );
        if (update.isAvailable) {
          const updateEnd = await Updates.fetchUpdateAsync();
          Alert.alert(
            'fetchUpdateAsync',
            `Atualizou? ${updateEnd.isNew}`,
            [
                { text: 'OK' },
            ]
          );
          // ... notify user of update ...
          await Updates.reloadAsync();
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
        <ActivityIndicator size='large' color='green'/>
      }
      {!updateController &&
        <>
        <Text>Atualização OTA</Text>
        <Text>Versão 1.0</Text>
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
