import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import Headercomponent from "../shared/header";
import {connect} from 'react-redux'
import axios from 'axios';
import { RefreshTiles } from "../../redux/actions/auth";

import Loader from '../shared/loading';

const url = require('../../environments')

class InfosHorario extends Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: false
          }
    }

    componentWillUnmount(){
        this.setState({
            loading: false
        })
    }

    clickRemove = () => {
        this.setState({
            loading: true
        })
        axios.post(`${url.prod}/estabelecimento/reserva/remove`, { 
            "horario": this.props.selectedHorarioInfos.horario, 
            "dia": this.props.selectedHorarioInfos.dia.split('T')[0],
            "idEstab": this.props.selectedHorarioInfos.idEstab
          }).then(res => {
              axios.get(`${url.prod}/auth/estabelecimento/${this.props.selectedHorarioInfos.idEstab}`)
              .then(res => {
                this.props.refresh({
                    estab: res.data
                })
              }).catch(err => {
                  console.log(err)
              })
          }).then(res => {
            //Solução paliativa enquanto eu não sei como sincronizar actions :(  
            setTimeout(() => {
                this.props.navigation.navigate('EstabelecimentoHome');
            }, 1000);
        }).catch(err => {
            console.log(err);
          })
    }

    render(){
        return (
             <View style={styles.container}>
                <View style={styles.header}>
                    <Headercomponent navigation={this.props.navigation} init={false} cor="branco" titulo="Informações de Reserva" />
                </View>
                <Loader loading={this.state.loading} />
                <View style={styles.mainCard}>
                    <Text style={styles.mainCardHorarioText}>{this.props.selectedHorarioInfos.horario}</Text>
                    <View style={styles.mainCardViewInfos}>
                        <Text style={{fontSize: 16}}>{'Cliente:  ' + this.props.selectedHorarioInfos.cliente}</Text>
                        <Text style={{fontSize: 16}}>{'Serviço:  ' + this.props.selectedHorarioInfos.servico}</Text>
                        <Text style={{fontSize: 16}}>{'Forma de Pagamento:  ' + this.props.selectedHorarioInfos.formaPgto}</Text>
                    </View>
                </View>
                <TouchableHighlight underlayColor="#FFF" onPress={this.clickRemove} style={styles.botaoRemove}>
                    <Text style={styles.botaoRemoveText}>Remover Reserva</Text>
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
    },
    header:{
        position: 'absolute',
        top: '4%'
    },
    mainCard:{
        display: "flex",
        flexDirection: "column",
        height: '40%',
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    botaoRemove:{
      backgroundColor: "#FFF",
      borderRadius: 10,
      height: "8%",
      width: "70%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    },
    botaoRemoveText:{
      color: "#ff5448",
      fontSize: 20
    },mainCardHorarioText:{
        position: 'absolute',
        top: 0,
        alignSelf:'center',
        fontSize: 30
    },
    mainCardViewInfos: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: '50%',
        marginLeft: '4%'
    }
});

const mapStatetoProps = (state) => {
    return {
        selectedHorarioInfos: state.authReducer.selectedHorarioInfos
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        refresh: (nav) => dispatch(RefreshTiles(nav))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(InfosHorario);