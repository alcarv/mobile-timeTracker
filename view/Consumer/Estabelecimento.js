import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Headercomponent from '../shared/header';
import axios from 'axios';

const url = require('../../environments')

class EstabelecimentoInfos extends Component {

    constructor(props) {
        super(props);
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
                <FlatList
                        numColumns={2}
                        ItemSeparatorComponent={() => <Text></Text>}
                        data={this.props.selectedEstab.valores}
                        renderItem={({ item }) => <Text>{`${item.servico}: R$${item.preco}  `}</Text>}
                        keyExtractor={item => item._id}
                    /> 
                <TouchableHighlight underlayColor="#ff5448" onPress={() => alert('ok')} style={styles.botaoHorarios}>
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
        justifyContent: "space-around",
        marginTop: '8%',
        height: '95%'
    },
    estabImage:{
        width: 250,
        height: 250,
        borderRadius: 20
    },
    nomeTxt: {
        fontSize: 28,
        width: '80%'
    },
    areaDesc:{
        height: 100,
        width: '80%'
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