import { StyleSheet, Text, View, ImageBackground, TouchableHighlight, TextInput } from 'react-native';
import React, { useState, Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {Login, LoginEstab} from '../../redux/actions/auth'
import Loader from '../shared/loading';

const url = require('../../environments')

class LoginComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        user: 'Consumidor',
        login: '',
        senha: '',
        loading: false
      };
    }

    clickCadastro = () => {
      this.props.navigation.navigate('Cadastro');
    }

    clickLogin = () => {
      if(this.state.login == '' || this.state.login == undefined || this.state.senha == '' || this.state.senha == undefined){
        alert('Preencha os campos!');
      }else{
        this.setState({
          loading: true
        })
        if(this.state.user == 'Consumidor'){
          axios.post(`${url.prod}/auth/consumidor/login`, { 
            "email": this.state.login, 
            "pswd": this.state.senha
          }).then(res => {
            if(res.data.length > 0){
              this.props.logar({
                nome: res.data[0].nome,
                email: res.data[0].email
              })
              this.setState({
                loading: false,
                login: '',
                senha: '',
              })
              this.props.navigation.navigate('ConsumerHome');
            }else{
              this.setState({
                loading: false,
                login: '',
                senha: '',
              })
              alert('E-mail ou Senha inválidos. Caso não possua cadastro, cadastre-se abaixo');
            }
          }).catch(err => {
            this.setState({
              loading: false,
                login: '',
                senha: '',
            })
            alert('Desculpe, ocorreu um erro inesperado. Tente novamente mais tarde.');
          })
        }else{
          axios.post(`${url.prod}/auth/estabelecimento/login`, { 
            "email": this.state.login, 
            "pswd": this.state.senha
          }).then(res => {
            if(res.data.length > 0){ 
              this.props.logarEstab(res.data[0])
              this.setState({
                loading: false,
                login: '',
                senha: '',
              })
              this.props.navigation.navigate('EstabelecimentoHome');
            }else{
              this.setState({
                loading: false,
                login: '',
                senha: '',
              })
              alert('E-mail ou Senha inválidos. Caso não possua cadastro, cadastre-se abaixo');
            }
          }).catch(err => {
            this.setState({
              loading: false,
                login: '',
                senha: '',
            })
            alert('Desculpe, ocorreu um erro inesperado. Tente novamente mais tarde.');
          })
        }
      }
    }

    clickSwitch = () =>{
        if(this.state.user == 'Consumidor'){
            this.setState({
              user: 'Estabelecimento'
            });
        }else{
          this.setState({
            user: 'Consumidor'
          });
        }
    }

    render() {
        return(
          <ImageBackground source={require('../../assets/background_cropped.jpg')} style={styles.container}>
          <Loader loading={this.state.loading} />
          <TouchableHighlight underlayColor="#ff5448" onPress={this.clickCadastro} style={styles.botaoCadastrar}>
            <Text style={styles.botaoCadastrarText}>Cadastrar-se</Text>
          </TouchableHighlight> 
          <Text style={styles.logo}>Time Tracker</Text>
          <View style={styles.login}> 
            <Text style={styles.LoginText}>Seus horários na palma da mão</Text>
            <TouchableHighlight underlayColor="#ff5448" onPress={this.clickSwitch} style={styles.botaoSwitch}> 
              <Text style={{fontSize: 20}}>{this.state.user}</Text>
            </TouchableHighlight>
            <View style={styles.loginInputView} >
              <TextInput style={styles.loginInput} placeholderTextColor="black" placeholder="Login" onChangeText={text => this.setState({login: text})} value={this.state.login}></TextInput>
              <TextInput secureTextEntry={true} style={styles.loginInput} placeholderTextColor="black" placeholder="Senha" onChangeText={text => this.setState({senha: text})} value={this.state.senha}></TextInput>
            </View>
            <TouchableHighlight underlayColor="#ff5448" onPress={this.clickLogin} style={styles.botaoLogin}>
              <Text style={styles.botaoLoginText}>Login</Text>
            </TouchableHighlight> 
          </View> 
        </ImageBackground> 
      )
    }

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
      fontSize: 24
    },
    LoginText:{
      fontSize: 20,
      color: "#fff",
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10
    },
    loginInput: {
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
      textAlign: 'center',
      backgroundColor: "#fff",
      width: "70%",
      height: '40%',
      fontSize: 19
    },
    loginInputView:{
      width:"100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: 'space-around',
      height: '30%'
    },
    botaoSwitch:{
      backgroundColor: "#ff5448",
      borderRadius: 10,
      height: "15%",
      width: "80%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    botaoCadastrar:{
      position: 'absolute',
      top: '8%',
      right: '8%',
      backgroundColor: "#ff5448",
      borderRadius: 10,
      height: "5%",
      width: "30%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    botaoCadastrarText:{
      color: "#fff",
      fontSize: 16
    }
  });

  const mapDispatchtoProps = (dispatch) => {
    return {
      logar: (user) => dispatch(Login(user)),
      logarEstab: (estab) => dispatch(LoginEstab(estab))
    }
  }

  export default connect(null, mapDispatchtoProps)(LoginComponent);