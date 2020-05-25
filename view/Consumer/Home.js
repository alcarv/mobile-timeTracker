import React, { Component } from 'react';
import { View, StyleSheet, TextInput, FlatList, SafeAreaView, Text } from 'react-native';
import { connect } from 'react-redux';
import Headercomponent from '../shared/header';
import axios from 'axios';
import CardComponent from '../shared/cardComponent';
import { SelectType } from '../../redux/actions/auth';

const url = require('../../environments')

class ConsumerHomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busca: '',
            arrTipos: []
        };
    }

    componentDidMount = () => {
        this.pegarTodosOsTipos();
    }

    changeSearch = (text) => {
        this.setState({busca: text});

        if(text == ''){
            this.pegarTodosOsTipos();
            return;
        }

        axios.get(`${url.prod}/estabelecimento/filtro/tipo/${text}`)
        .then(res => {
            this.setState({arrTipos: res.data})
        })
        .catch(err => {
            alert('Houve um erro inesperado! Contate um administrador do sistema.')
        })
    }

    pegarTodosOsTipos = () => {
        axios.get(`${url.prod}/estabelecimento/tipos`)
        .then(res => {
            this.setState({arrTipos: res.data})
        })
        .catch(err => {
            alert('Houve um erro inesperado! Contate um administrador do sistema.')
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <Headercomponent init={true} titulo="Estabelecimento" ></Headercomponent>  
                <View style={styles.search}>
                    <TextInput maxLength={20} style={styles.buscaInput} placeholderTextColor="black" placeholder="Filtre seus locais favoritos" 
                    onChangeText={text => this.changeSearch(text)} value={this.state.busca}></TextInput>
                </View>
                <SafeAreaView style={styles.safeView}>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.list}
                        ItemSeparatorComponent={() => <Text></Text>}
                        data={this.state.arrTipos}
                        renderItem={({ item }) => <CardComponent navigation= {this.props.navigation} style={styles.card} nome={item.nome} imgUrl={item.imgUrl} parent="home"/>}
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
    },
    safeView: {
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
});

const mapStatetoProps = (state) => {
    return {
        loggedUser: state.authReducer.loggedUser
    }
}


export default connect(mapStatetoProps, null)(ConsumerHomeComponent);