import React, { useState } from 'react';
import { StyleSheet, Text, SafeAreaView, TextInput, Button, View } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [status, setStatus] = useState('')
  const [showCupom, setShowCupom] = useState(false);

  const handleVerifyLogin = async () => {
    setStatus('');
    setShowCupom(false);

    const req = await fetch('https://api.b7web.com.br/loginsimples/', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await req.json();

    if(json.status == 'ok') {
      setStatus('Acesso LIBERADO');
      setShowCupom(true);
    } else {
      setStatus('Acesso NEGADO');
      setShowCupom(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Desconto UltraBlaster</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Digite seu e-mail" 
        value={email}
        onChangeText={t=>setEmail(t)}  
      />

      <TextInput 
        style={styles.input} 
        placeholder="Digite sua senha" 
        value={password}
        onChangeText={t=>setPassword(t)} 
        secureTextEntry={true} 
      />

      <Button title="Verificar" onPress={handleVerifyLogin} />

      <Text style={styles.status}>{status}</Text>

      {showCupom &&
        <View style={styles.cupomArea}>
          <Text style={styles.cupomTitle}>Código de cupon</Text>
          <Text style={styles.cupomCode}>MJKDSK123</Text>
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#333"
  },
  header: {
    color: "#fff",
    fontSize: 25,
    textAlign: "center",
    marginBottom:30,
    marginTop: 20
  },
  input: {
    height: 45,
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#555",
    borderRadius:5,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  status: {
    margin: 50,
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center'
  },
  cupomArea: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 30
  },
  cupomTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40
  },
  cupomCode: {
    textAlign:'center',
    fontSize: 40
  }
});
