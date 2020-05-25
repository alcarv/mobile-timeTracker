import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text, Image } from "react-native";

class HorarioCard extends Component{

    constructor(props) {
        super(props);
    }

    navegar = () => {
        
    }

    render(){
        if(this.props.item.reservado){
            return(
                <View style={styles.container}>
                    <TouchableHighlight underlayColor="#B8B6B4" style={styles.cardTouchReservado} onPress={this.navegar}>
                        <View style={styles.viewReservado}>
                            <Text>{this.props.item.inicioHora + ':' + this.props.item.inicioMinuto + ' - ' + this.props.item.fimHora + ':' + this.props.item.fimMinuto}</Text>
                            <Text style={styles.textIndisp}>Indisponível</Text>
                            <Image source={require('../../assets/caution.png')} style={styles.imgCaution}></Image>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <TouchableHighlight underlayColor="#fff" style={styles.cardTouchDisponivel} onPress={this.navegar}>
                        <View style={styles.viewDisp}>
                            <Text>{this.props.item.inicioHora + ':' + this.props.item.inicioMinuto + ' - ' + this.props.item.fimHora + ':' + this.props.item.fimMinuto}</Text>
                            <Image source={require('../../assets/relogio.png')} style={styles.imgRelogio}></Image>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }
    }

}


const styles = StyleSheet.create({ 
    container:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '40%',
        height: 130
    },
    cardTouchDisponivel: {
        width: '100%',
        height: '80%',
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff'
    },
    cardTouchReservado: {
        width: '100%',
        height: '80%',
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#B8B6B4'
    },
    viewReservado: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewDisp: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textIndisp:{
        position: 'absolute',
        bottom: 0
    },
    imgCaution:{
        position: 'absolute',
        bottom: -10,
        left: -15,
        width: 50,
        height: 50
    },
    imgRelogio:{
        position: 'absolute',
        bottom: -30,
        left: -35,
        width: 70,
        height: 70
    }
});

export default HorarioCard;