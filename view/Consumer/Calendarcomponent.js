import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

class Calendarcomponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            dia: new Date().getDate() - 1,
            mes: new Date().getMonth() + 1
        }
    }

    addDay = () => {
        if(this.state.dia == 31){
            this.setState({
                dia: 1,
                mes: this.state.mes + 1
            })
        }else{
            this.setState({
                dia: this.state.dia + 1,
                mes: this.state.mes
            })
        }
    }

    subDay = () => {
        if(this.state.dia == 1){
            this.setState({
                dia: 31,
                mes: this.state.mes - 1
            })
        }else{
            this.setState({
                dia: this.state.dia - 1,
                mes: this.state.mes
            })
        }
    }

    addMonth = () => {
        if(this.state.mes == 12){
            this.setState({
                dia: this.state.dia,
                mes: 1
            })
        }else{
            this.setState({
                dia: this.state.dia,
                mes: this.state.mes + 1
            })
        }
    }

    subMonth = () => {
        if(this.state.mes == 1){
            this.setState({
                dia: this.state.dia,
                mes: 12
            })
        }else{
            this.setState({
                dia: this.state.dia,
                mes: this.state.mes - 1
            })
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.calendarLabel}>Data: </Text>
                <View style={styles.interactiveDate}>
                    <TouchableHighlight onPress={this.addDay} underlayColor="#ff5448">
                        <Image style={styles.setas} source={require('../../assets/seta_cima_branca.png')}/>
                    </TouchableHighlight>  
                        <Text style={styles.calendarText}>{this.state.dia}</Text>
                    <TouchableHighlight onPress={this.subDay} underlayColor="#ff5448">
                        <Image style={styles.setas} source={require('../../assets/seta_baixo_branca.png')}/>
                    </TouchableHighlight>  
                </View>
                <Text style={styles.calendarText}> / </Text>
                <View style={styles.interactiveDate}>
                    <TouchableHighlight onPress={this.addMonth} underlayColor="#ff5448">
                        <Image style={styles.setas} source={require('../../assets/seta_cima_branca.png')}/>
                    </TouchableHighlight>  
                        <Text style={styles.calendarText}>{this.state.mes}</Text>
                    <TouchableHighlight onPress={this.subMonth} underlayColor="#ff5448">
                        <Image style={styles.setas} source={require('../../assets/seta_baixo_branca.png')}/>
                    </TouchableHighlight>  
                </View>
            </View>
        )
    }
    
    
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#FF473A',
        backgroundColor: 'red'
    },
    calendarLabel: {
        fontSize: 32,
        color: '#fff'
    },
    interactiveDate: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    calendarText: {
        fontSize: 32,
        color: '#fff'
    },
    setas: {
        height: 34,
        width: 34
    }
})

export default Calendarcomponent;