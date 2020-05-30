import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, Text, Image } from "react-native";
import { connect } from 'react-redux';
import { SelectHorario, SelectHorarioInfo } from "../../redux/actions/auth";

class HorarioCard extends Component{

    constructor(props) {
        super(props);
    }

    navegar = () => {
        this.props.selecionar({
            hora: this.props.item.inicioHora + ':' + this.props.item.inicioMinuto,
            data: this.props.calendar.dia + '/' + this.props.calendar.mes
        })
        this.props.navigation.navigate('infosAgend');
    }

    navegarEstab = () => {
        this.props.selecionarInfos({
            cliente: this.props.item.cliente,
            servico: this.props.item.servico,
            formaPgto: this.props.item.formaPgto,
            horario: this.props.item.inicioHora + ':' + this.props.item.inicioMinuto,
            idEstab: this.props.loggedEstab._id,
            dia: this.props.item.dia
        })
        this.props.navigation.navigate('InfosHorario');
    }

    render(){
        if(this.props.item.reservado && !this.props.estab){
            return(
                <View style={styles.container}>
                    <TouchableHighlight underlayColor="#B8B6B4" style={styles.cardTouchReservado}>
                        <View style={styles.viewReservado}>
                            <Text>{this.props.item.inicioHora + ':' + this.props.item.inicioMinuto + ' - ' + this.props.item.fimHora + ':' + this.props.item.fimMinuto}</Text>
                            <Text style={styles.textIndisp}>Indisponível</Text>
                            <Image source={require('../../assets/caution.png')} style={styles.imgCaution}></Image>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }else if(this.props.item.reservado && this.props.estab){
            return(
                <View style={styles.container}>
                    <TouchableHighlight underlayColor="#FFF" style={styles.cardTouchReservadoEstab} onPress={this.navegarEstab}>
                        <View style={styles.viewReservado}>
                            <Text>{this.props.item.inicioHora + ':' + this.props.item.inicioMinuto + ' - ' + this.props.item.fimHora + ':' + this.props.item.fimMinuto}</Text>
                            <Text style={styles.textIndispEstab}>Reservado</Text>
                            <Image source={require('../../assets/check.png')} style={styles.imgCheck}></Image>
                        </View>
                    </TouchableHighlight>
                </View>
            )
        }else if(!this.props.item.reservado && !this.props.estab) {
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
        }else{
            return(
                <View style={styles.container}>
                    <TouchableHighlight underlayColor="#B8B6B4" style={styles.cardTouchDisponivelEstab}>
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
    cardTouchDisponivelEstab:{
        width: '100%',
        height: '80%',
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#B8B6B4'
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
    cardTouchReservadoEstab:{
        width: '100%',
        height: '80%',
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FFF'
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
    textIndispEstab:{
        position: 'absolute',
        top: 0
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
    },
    imgCheck:{
        position: 'absolute',
        bottom: -10,
        left: -15,
        width: 45,
        height: 45
    }
});

const mapDispatchtoProps = (dispatch) => {
    return {
        selecionar: (infoHorario) => dispatch(SelectHorario(infoHorario)),
        selecionarInfos: (infoHorario) => dispatch(SelectHorarioInfo(infoHorario))
    }
}

const mapStatetoProps = (state) => {
    return {
        calendar: state.authReducer.calendar,
        loggedEstab: state.authReducer.loggedEstab
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(HorarioCard);