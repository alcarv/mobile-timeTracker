import React, { Component } from 'react';
import { View, StyleSheet, TextInput, FlatList, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import Headercomponent from '../shared/header';
import axios from 'axios';
import CardComponent from '../shared/cardComponent';

const url = require('../../environments')

class EstabelecimentoPorTipoComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busca: '',
            arrEstab: []
        };
    }

    componentDidMount = () => {
        this.pegarTodosOsEstabelecimentos();
    }

    pegarTodosOsEstabelecimentos = () => {
        axios.get(`${url.dev}/estabelecimento/${this.props.selectedType.nome}`)
        .then(res => {
            this.setState({arrEstab: res.data})
        })
        .catch(err => {
            alert('Houve um erro inesperado! Contate um administrador do sistema.')
        })
    }

    changeSearch = (text) => {
        this.setState({busca: text});

        if(text == ''){
            this.pegarTodosOsEstabelecimentos();
            return;
        }

        axios.get(`${url.dev}/estabelecimento/${text}/${this.props.selectedType.nome.toLowerCase()}`)
        .then(res => {
            this.setState({arrEstab: res.data})
        })
        .catch(err => {
            alert('Houve um erro inesperado! Contate um administrador do sistema.')
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Headercomponent titulo={this.props.selectedType.nome} ></Headercomponent>  
                <View style={styles.search}>
                    <TextInput maxLength={20} style={styles.buscaInput} placeholderTextColor="black" placeholder="Filtre seus locais favoritos" 
                    onChangeText={text => this.changeSearch(text)} value={this.state.busca}></TextInput>
                </View>
                <SafeAreaView style={styles.safeView}>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.list}
                        ItemSeparatorComponent={() => <Text></Text>}
                        data={this.state.arrEstab}
                        renderItem={({ item }) => <CardComponent style={styles.card} navigation= {this.props.navigation} nome={item.nome} imgUrl={this.props.selectedType.url} estab={item} parent="porTipo"/>}
                        keyExtractor={item => item._id}
                    />    
                </SafeAreaView>
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
        marginTop: 30
    },
    search: {
        width: '100%',
        display: "flex",
        alignItems: "center"
    },safeView: {
        height: '80%',
        width: '100%'
    },
    buscaInput: {
        width: '80%',
        borderColor: "#FF473A",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center'
    },
    card:{
        width: '48%'
    },
    list:{
        justifyContent: "space-around"
    }

})

const mapStatetoProps = (state) => {
    return {
        loggedUser: state.authReducer.loggedUser,
        selectedType: state.authReducer.selectedType
    }
}

export default connect(mapStatetoProps, null)(EstabelecimentoPorTipoComponent);