import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import { Altercalendar } from "../../redux/actions/auth";

class Calendarcomponent extends Component{
    constructor(props){
        super(props);
    }

    addDay = () => {
        if(this.props.calendar.dia == 31){
            this.props.alterar({
                dia: 1,
                mes: this.props.calendar.mes + 1
            })
        }else{
            this.props.alterar({
                dia: this.props.calendar.dia + 1,
                mes: this.props.calendar.mes
            })
        }
    }

    subDay = () => {
        if(this.props.calendar.dia == 1){
            this.props.alterar({
                dia: 31,
                mes: this.props.calendar.mes - 1
            })
        }else{
            this.props.alterar({
                dia: this.props.calendar.dia - 1,
                mes: this.props.calendar.mes
            })
        }
    }

    addMonth = () => {
        if(this.props.calendar.mes == 12){
            this.props.alterar({
                dia: this.props.calendar.dia,
                mes: 1
            })
        }else{
            this.props.alterar({
                dia: this.props.calendar.dia,
                mes: this.props.calendar.mes + 1
            })
        }
    }

    subMonth = () => {
        if(this.props.calendar.mes == 1){
            this.props.alterar({
                dia: this.props.calendar.dia,
                mes: 12
            })
        }else{
            this.props.alterar({
                dia: this.props.calendar.dia,
                mes: this.props.calendar.mes - 1
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
                        <Text style={styles.calendarText}>{this.props.calendar.dia}</Text>
                    <TouchableHighlight onPress={this.subDay} underlayColor="#ff5448">
                        <Image style={styles.setas} source={require('../../assets/seta_baixo_branca.png')}/>
                    </TouchableHighlight>  
                </View>
                <Text style={styles.calendarText}> / </Text>
                <View style={styles.interactiveDate}>
                    <TouchableHighlight onPress={this.addMonth} underlayColor="#ff5448">
                        <Image style={styles.setas} source={require('../../assets/seta_cima_branca.png')}/>
                    </TouchableHighlight>  
                        <Text style={styles.calendarText}>{this.props.calendar.mes}</Text>
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
        justifyContent: 'space-around',
        backgroundColor: '#FF473A',
        width: '80%'
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

const mapStatetoProps = (state) => {
    return {
        calendar: state.authReducer.calendar
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
      alterar: (calendar) => dispatch(Altercalendar(calendar))
    }
  }

export default connect(mapStatetoProps, mapDispatchtoProps)(Calendarcomponent);