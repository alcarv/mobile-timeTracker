import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, TextInput } from 'react-native';
import React, { useState, Component } from 'react';
import axios from 'axios';
const url = require('../../environments')

export default function LoginComponent({navigation}){
    const[user, setUser] = useState('Consumidor');

    let login;
    let senha;


    function clickLogin() {
      if(login == '' || login == undefined || senha == '' || senha == undefined){
        alert('Preencha os campos!');
      }else{
        axios.post(`${url.dev}/auth/consumidor/login`, { 
        "email": login, 
        "pswd": senha
      }).then(res => {
        if(res.data.length > 0){
          navigation.navigate('ConsumerHome');
        }else{
          alert('E-mail ou Senha inválidos. Caso não possua cadastro, cadastre-se abaixo');
        }
      }).catch(err => {
        console.log(err);
      })
      }
    }

    let clickSwitch = () =>{
        if(user == 'Consumidor'){
            setUser('Estabelecimento');
        }else{
            setUser('Consumidor');
        }
    }

    return(
        <ImageBackground source={require('../../assets/background_cropped.jpg')} style={styles.container}>
        <Text style={styles.logo}>Time Tracker</Text>
        <View style={styles.login}> 
          <Text style={styles.LoginText}>Seus horários na palma da mão</Text>
          <TouchableHighlight underlayColor="#ff5448" onPress={clickSwitch} style={styles.botaoSwitch}>
            <Text>{user}</Text>
          </TouchableHighlight>
          <View style={styles.loginInputView} >
            <TextInput style={styles.loginInput} placeholderTextColor="black" placeholder="Login" onChangeText={text => login = text} value={login}></TextInput>
            <TextInput secureTextEntry={true} style={styles.loginInput} placeholderTextColor="black" placeholder="Senha" onChangeText={text => senha = text} value={senha}></TextInput>
          </View>
          <TouchableHighlight underlayColor="#ff5448" onPress={clickLogin} style={styles.botaoLogin}>
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
    },
    botaoSwitch:{
      backgroundColor: "#ff5448",
      borderRadius: 10,
      height: "15%",
      width: "80%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }
  });