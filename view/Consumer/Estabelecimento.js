import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, ScrollView, FlatList, TouchableHighlight, Modal } from 'react-native';
import { connect } from 'react-redux';
import Headercomponent from '../shared/header';
import axios from 'axios';

const url = require('../../environments')

class EstabelecimentoInfos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }

    switchModal = () => {
        if(this.state.modalVisible){
            this.setState({modalVisible: false})
        }else{
            this.setState({modalVisible: true})
        }
    }

    verHorarios = () => {
        this.props.navigation.navigate('horarios');
    }

    render(){
        return(
            <View style={styles.container}>
                <Headercomponent titulo={this.props.selectedType.nome} ></Headercomponent>  
                <Image source={{uri: this.props.selectedType.url}} style={styles.estabImage}/>
                <Text style={styles.nomeTxt}>{this.props.selectedEstab.nome}</Text>
                <ScrollView style={styles.areaDesc}>
                    <Text style={styles.descTxt}>{this.props.selectedEstab.descricao}</Text>
                </ScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <FlatList
                                contentContainerStyle={styles.list}
                                justifyContent="center"
                                ItemSeparatorComponent={() => <Text></Text>}
                                data={this.props.selectedEstab.valores}
                                renderItem={({ item }) => <Text>{`${item.servico}:    R$${item.preco}`}</Text>}
                                keyExtractor={item => item._id}
                            />
                            <TouchableHighlight underlayColor="#ff5448" onPress={this.switchModal} style={styles.botaoClose}>
                                <Text style={styles.botaoCloseText}>Fechar</Text>
                            </TouchableHighlight>  
                        </View>
                    </View>
                </Modal>
                <TouchableHighlight underlayColor="#ff5448" onPress={this.switchModal} style={styles.botaoServicos}>
                    <Text style={styles.botaoServicosText}>Serviços</Text>
                </TouchableHighlight>  
                <TouchableHighlight underlayColor="#ff5448" onPress={this.verHorarios} style={styles.botaoHorarios}>
                    <Text style={styles.botaoHorariosText}>Horários</Text>
                </TouchableHighlight>    
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-around',
        marginTop: '8%',
        height: '95%'
    },
    estabImage:{
        width: 200,
        height: 200,
        borderRadius: 20
    },
    nomeTxt: {
        fontSize: 28,
        width: '80%'
    },
    areaDesc:{
        width: '80%',
        maxHeight: '20%'
    },
    descTxt:{
        fontSize: 12
    },
    botaoHorarios:{
        backgroundColor: "#ff5448",
        borderRadius: 10,
        height: 50,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    botaoHorariosText: {
        color: "#fff",
        fontSize: 20
    },
    botaoServicos:{
        backgroundColor: "#ff5448",
        borderRadius: 10,
        height: 30,
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    botaoServicosText: {
        color: "#fff",
        fontSize: 20
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        height: 300
    },
    botaoClose:{
        backgroundColor: "#ff5448",
        borderRadius: 10,
        height: 30,
        width: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    botaoCloseText:{
        color: "#fff",
        fontSize: 16
    }
})

const mapStatetoProps = (state) => {
    return {
        loggedUser: state.authReducer.loggedUser,
        selectedType: state.authReducer.selectedType,
        selectedEstab: state.authReducer.selectedEstab
    }
}

export default connect(mapStatetoProps, null)(EstabelecimentoInfos);