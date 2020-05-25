import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight, Image } from "react-native";

class ThanksComponent extends Component{

    constructor(props) {
        super(props);
    }

    voltar = () => {
        this.props.navigation.popToTop()
    }

    render(){
        return (
             <View style={styles.container}>
                <Text style={{color: '#fff', fontSize: 26}}>Sucesso</Text>
                <Image source={require('../../assets/check.png')} style={{height: 150, width: 150}}></Image>
                <Text style={{color: '#fff', fontSize: 26}}>Seu horário foi reservado!</Text>
                <TouchableHighlight underlayColor="#fff" onPress={this.voltar} style={styles.botaoVoltar}>
                    <Text style={styles.botaoVoltarText}>Voltar ao início</Text>
                </TouchableHighlight> 
            </View>
        )
    }

}


const styles = StyleSheet.create({ 
    container:{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#FF473A'
    },botaoVoltar:{
        backgroundColor: "#fff",
        borderRadius: 20,
        height: "10%",
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    botaoVoltarText:{
        color: "#ff5448",
        fontSize: 20
    }
});

export default ThanksComponent;