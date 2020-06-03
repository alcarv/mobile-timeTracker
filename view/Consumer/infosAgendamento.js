import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight, Picker } from "react-native";
import Headercomponent from "../shared/header";
import {connect} from 'react-redux'
import axios from 'axios';
const url = require('../../environments')

class InfosAgendamento extends Component{

    constructor(props) {
        super(props);
        this.state = {
            servico: this.props.selectedEstab.valores[0],
            formaPgto: 'Cartão'
        }
    }

    agendar = () => {
        axios.post(`${url.prod}/consumidor/reserva`, { 
            "nome": this.props.loggedUser.nome,
            "email": this.props.loggedUser.email,
            "servico": this.state.servico.servico,
            "formaPgto": this.state.formaPgto,
            "horario": this.props.selectedHorario.hora,
            "dia": '2020' + '-' + this.props.selectedHorario.data.split('/')[1] + '-' + this.props.selectedHorario.data.split('/')[0],
            "idEstab": this.props.selectedEstab._id
          }).then(res => {
            this.props.navigation.navigate('thanks');
          }).catch(err => {
            this.props.navigation.popToTop();
          })

        this.props.navigation.navigate('thanks');
    }

    render(){
        return (
             <View style={styles.container}>
                <View style={styles.header}>
                    <Headercomponent navigation={this.props.navigation} init={false} cor="branco" titulo="Informações" />
                </View>
                <View style={styles.infosAgendamento}>
                    <Text style={{color: '#fff', fontSize: 24}}>{this.props.selectedEstab.nome}</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>{'Horário: ' + this.props.selectedHorario.hora}</Text>
                    <Text style={{color: '#fff', fontSize: 16}}>{'Data: ' + this.props.selectedHorario.data}</Text>
                </View>
                <View style={styles.interaction}>
                    <View style={styles.servico}>
                        <Text style={{color: '#fff', fontSize: 30}}>Serviço: </Text>
                        <View  style={{ height: 50, width: 200, backgroundColor: '#fff', borderRadius: 12}}>
                            <Picker
                                selectedValue={this.state.servico}
                                style={{ height: 50, width: 200}}
                                onValueChange={(itemValue) => {
                                    this.setState({
                                        servico: itemValue
                                    })
                                }}>
                                {
                                this.props.selectedEstab.valores.map(
                                    (servico) => {
                                        return (
                                            <Picker.Item label={servico.servico} key={servico._id} value={servico} />
                                        );
                                     }
                                )
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.pagamento}>
                        <Text style={{color: '#fff', fontSize: 30}}>Pagamento: </Text>
                        <View  style={{ height: 50, width: 150, backgroundColor: '#fff', borderRadius: 12}}>
                            <Picker
                                selectedValue={this.state.formaPgto}
                                style={{ height: 50, width: 150}}
                                onValueChange={(itemValue) => {
                                    this.setState({
                                        formaPgto: itemValue
                                    })
                                }}>
                                <Picker.Item label="Cartão" value="Cartão" />
                                <Picker.Item label="Dinheiro" value="Dinheiro" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View style={styles.valor}>
                    <Text style={{color: '#fff', fontSize: 18}}>{'Total: R$ ' + this.state.servico.preco}</Text>
                </View>
                <View style={styles.viewBotaoAgendar}>
                    <TouchableHighlight underlayColor="#fff" onPress={this.agendar} style={styles.botaoAgendar}>
                        <Text style={styles.botaoAgendarText}>Agendar</Text>
                    </TouchableHighlight> 
                </View>
            </View>
        )
    }

}


const styles = StyleSheet.create({ 
    container:{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        height: '100%',
        backgroundColor: '#FF473A'
    },
    infosAgendamento:{
        display: "flex",
        flexDirection: 'column',
        alignItems: "center"
    },
    interaction:{
        display: 'flex',
        flexDirection: 'column',
        height: '25%',
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    servico:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        width: '100%'
    },
    pagamento:{
        display: 'flex',
        flexDirection: 'row',
        marginLeft: 10,
        width: '100%'
    },
    valor:{
        height: '5%',
        width: '100%',
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewBotaoAgendar:{
        width: '100%',
        height: '7%',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center"
    },
    botaoAgendar:{
        backgroundColor: "#fff",
        borderRadius: 20,
        height: "100%",
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    botaoAgendarText:{
        color: "#ff5448",
        fontSize: 20
    }
});

const mapStatetoProps = (state) => {
    return {
        selectedHorario: state.authReducer.selectedHorario,
        selectedEstab: state.authReducer.selectedEstab,
        loggedUser: state.authReducer.loggedUser
    }
}

export default connect(mapStatetoProps, null)(InfosAgendamento);