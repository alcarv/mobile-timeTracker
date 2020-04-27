import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, TextInput } from 'react-native';
import axios from 'axios';

export default function App() {

  let login;
  let senha;

  function clickLogin() {
    console.log(login)
    console.log(senha)
    if(login == '' || login == undefined || senha == '' || senha == undefined){
      alert('Preencha os campos!');
    }else{
      axios.post('http://192.168.0.119:3000/auth/consumidor/login', { 
      "email": login, 
      "pswd": senha
    }).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    })
    }
  }

  return (
    <ImageBackground source={require('./assets/background_cropped.jpg')} style={styles.container}>
      <Text style={styles.logo}>Time Tracker</Text>
      <View style={styles.login}> 
        <Text style={styles.LoginText}>Seus horários na palma da mão</Text>
        <View style={styles.loginInputView} >
          <TextInput style={styles.loginInput} placeholderTextColor="black" placeholder="Login" onChangeText={text => login = text} value={login}></TextInput>
          <TextInput secureTextEntry={true} style={styles.loginInput} placeholderTextColor="black" placeholder="Senha" onChangeText={text => senha = text} value={senha}></TextInput>
        </View>
        <TouchableHighlight onPress={clickLogin} style={styles.botaoLogin}>
          <Text style={styles.botaoLoginText}>Login</Text>
        </TouchableHighlight>
      </View> 
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    height: '100%',
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  logo: {
    fontSize: 56,
    textAlign: "left",
    position: "absolute",
    top: "5%", 
    width: "60%",
    left: "2%"
  },
  login:{ 
    width: "80%",
    height: "50%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: "5%"
  },
  botaoLogin:{
    backgroundColor: "#ff5448",
    borderRadius: 10,
    height: "15%",
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  botaoLoginText: {
    color: "#fff",
    fontSize: 20
  },
  LoginText:{
    fontSize: 20,
    color: "#fff",
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  loginInput: {
    width: "60%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: "#fff",
    width: "70%"
  },
  loginInputView:{
    width:"100%",
    flexDirection: "column",
    alignItems: "center" 
  }
});
