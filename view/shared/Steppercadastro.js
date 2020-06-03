import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, SafeAreaView, TouchableHighlight, Image, TouchableOpacity, ScrollView } from "react-native";
import { connect } from 'react-redux';
import { SelectTypeCadastro } from "../../redux/actions/auth";
import axios from 'axios';

const url = require('../../environments')

class Stepper extends Component{

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            pswd: '',
            nrDocumento: '',
            endereco: '',
            servico: '',
            preco: '',
            arrServico: [],
            clienteEstabActive: true,
            clienteClienteActive: false,
            nomeCliente: '',
            emailCliente: '',
            pswdCliente: '',
            nrDocumentoCliente: '',
            arrTipos: ['manicure', 'pedicure', 'pet-shop', 'loja de moto', 'barbearia'],
            arrSelectedTipos: [],
            inicioExp: '',
            fimExp: '',
            duracaoExp: ''
        }
    }

    componentWillUnmount(){
        this.setState({
            nome: '',
            email: '',
            pswd: '',
            nrDocumento: '',
            endereco: '',
            descricao: '',
            servico: '',
            preco: '',
            arrServico: [],
            clienteEstabActive: true,
            clienteClienteActive: false,
            nomeCliente: '',
            emailCliente: '',
            pswdCliente: '',
            nrDocumentoCliente: '',
            arrTipos: ['manicure', 'pedicure', 'pet-shop', 'loja de moto', 'barbearia'],
            arrSelectedTipos: [],
            inicioExp: '',
            fimExp: '',
            duracaoExp: ''
        })
    }

    adicionarServico = () => {
        if(this.state.servico == '' || this.state.preco == ''){
            alert('Preencha os campos com o nome do serviço e o valor');
            return false;
        }
        this.state.arrServico.push({
            servico: this.state.servico,
            preco: this.state.preco
        })
        this.setState({
            servico: '',
            preco: ''
        })
    }

    removerServico = (indeX) => {
        let arrRestante = this.state.arrServico.filter((serv, index) => {
            return indeX != index
        })
        this.setState({
            arrServico: arrRestante
        })
    }

    clienteEstab = () => {
        if(this.state.clienteClienteActive){
            this.props.selecionar('Estabelecimento')
            this.setState({
                clienteEstabActive: true,
                clienteClienteActive: false
            })
        }else{
            this.props.selecionar('Estabelecimento')
            this.setState({
                clienteEstabActive: true
            })
        }
    }

    clienteCliente = () => {
        if(this.state.clienteEstabActive){
            this.props.selecionar('Consumidor')
            this.setState({
                clienteClienteActive: true,
                clienteEstabActive: false
            })
        }else{
            this.props.selecionar('Consumidor')
            this.setState({
                clienteClienteActive: true
            })
        }
    }

    selecionarTipo = (index, tipo) => {
        if(tipo.includes('|')){
            let newTipo = tipo.split('|')[0]
            this.state.arrTipos.splice(index, 1, newTipo);
            this.setState({
                arrTipos: this.state.arrTipos
            })
        }else{
            let newTipo = tipo + '|';
            this.state.arrTipos.splice(index, 1, newTipo);
            this.setState({
                arrTipos: this.state.arrTipos
            })
        }
    }

    componentDidUpdate(){
        if(this.props.finaliza == 'Estabelecimento'){
            
            axios.post(`${url.prod}/auth/cadastro/estabelecimento`, { 
                "email": this.state.login, 
                "pswd": this.state.senha
              }).then(res => {
                alert('Cadastro realizado com sucesso')
                this.props.navigation.navigate('Login')
              }).catch(err => {
                alert('Erro ao cadastrar. Tente novamente mais tarde')
                this.props.navigation.navigate('Login')
              })
            
        }else if (this.props.finaliza == 'Consumidor'){
            if(this.state.nomeCliente == '' || this.state.emailCliente == '' || this.state.nrDocumentoCliente == '' || this.state.pswdCliente == ''){
                alert('Preencha todos os campos')
                return false;
            }
            axios.post(`${url.prod}/auth/cadastro/consumidor`, { 
                "nome": this.state.nomeCliente,
                "email": this.state.emailCliente,
                "cpf": this.state.nrDocumentoCliente,
                "pswd": this.state.pswdCliente
              }).then(res => {
                alert('Cadastro realizado com sucesso')
                this.props.navigation.navigate('Login')
              }).catch(err => {
                alert('Erro ao cadastrar. Tente novamente mais tarde')
                this.props.navigation.navigate('Login')
              })
        }else{

        }
    }

    renderizarPagina(){
        if(this.props.pagina == 0){
            return (
                <View style={styles.CadInputView} >
                    <Text style={{color: '#FFF', fontSize: 20, textAlign: 'center'}}>Deseja se cadastrar como Estabelecimento ou Consumidor?</Text>
                    <View style={styles.viewBtnsInit}>
                        <TouchableHighlight onPress={this.clienteEstab} underlayColor="#FF473A" style={
                            this.state.clienteEstabActive ? styles.btnsinit : styles.btnsinitActive
                        }>
                            <Text style={
                                this.state.clienteEstabActive ? styles.btnsInitText : styles.btnsInitTextActive
                            }>Estabelecimento</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.clienteCliente} underlayColor="#FF473A" style={
                            this.state.clienteClienteActive ? styles.btnsinit : styles.btnsinitActive
                        }>
                            <Text style={
                                this.state.clienteClienteActive ? styles.btnsInitText : styles.btnsInitTextActive
                            }>Consumidor</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            )
        }else if(this.props.pagina == 1){
            return (
                <View style={styles.CadInputView} >
                    <TextInput style={styles.CadInput} placeholderTextColor="black" placeholder="Nome do Estabelecimento" onChangeText={text => this.setState({nome: text})} value={this.state.nome}></TextInput>
                    <TextInput style={styles.CadInput} placeholderTextColor="black" placeholder="Nome de usuário" onChangeText={text => this.setState({email: text})} value={this.state.email}></TextInput>
                    <TextInput secureTextEntry={true} style={styles.CadInput} placeholderTextColor="black" placeholder="Senha" onChangeText={text => this.setState({pswd: text})} value={this.state.pswd}></TextInput>
                    <TextInput style={styles.CadInput} placeholderTextColor="black" keyboardType='numeric' placeholder="CNPJ/CPF" onChangeText={text => this.setState({nrDocumento: text})} value={this.state.nrDocumento}></TextInput>
                    <TextInput style={styles.CadInput} placeholderTextColor="black" placeholder="Endereço" onChangeText={text => this.setState({endereco: text})} value={this.state.endereco}></TextInput>
                </View>
            )
        }else if(this.props.pagina == 2){
            return (
                <View style={styles.CadInputDescView} >
                    <Text style={{color: '#FFF', fontSize: 12, textAlign: 'center'}}>Por favor, descreva seu estabelecimento. Essa descrição será disponibilizada aos seus clientes.</Text>
                    <TextInput style={styles.CadInputDesc} multiline={true} placeholderTextColor="black" onChangeText={text => this.setState({descricao: text})} value={this.state.descricao}></TextInput>
                </View>
            )
        }else if(this.props.pagina == 3){
            return (
                <View style={styles.CadInputView}>
                    <Text style={{color: '#FFF', fontSize: 22, textAlign: 'center'}}>Serviços Prestados</Text>
                    <SafeAreaView style={styles.safeCadInputed}>
                        <ScrollView contentContainerStyle={styles.flexScroll} style={styles.scrollInputed}>
                        {
                            this.state.arrServico.map(
                                (servico, index) => {
                                    return (
                                            <View key={index} style={styles.servicoTagView}>
                                                <Text style={{fontSize: 12}}>{'Serviço: ' + servico.servico + '   Preço: R$' + servico.preco}</Text>
                                                <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => this.removerServico(index)}>
                                                    <Image source={require('../../assets/close.png')} style={{height: 12, width: 12}}></Image>
                                                </TouchableOpacity>
                                            </View>
                                    )
                                }
                            )
                        }
                        </ScrollView>
                    </SafeAreaView>
                    <SafeAreaView style={styles.safeCadInputs}>
                        <TextInput style={styles.inputSafe} placeholderTextColor="black" placeholder="Serviço" onChangeText={text => this.setState({servico: text})} value={this.state.servico}></TextInput>
                        <TextInput keyboardType='numeric' style={styles.inputSafe} placeholderTextColor="black" placeholder="Valor" onChangeText={text => this.setState({preco: text})} value={this.state.preco}></TextInput>
                    </SafeAreaView>
                    <View style={styles.viewButtons}> 
                        <TouchableHighlight onPress={this.adicionarServico} underlayColor="#FF473A" style={styles.botaoNewServ}>
                            <Text style={styles.botaoNewServText}>Adicionar serviço</Text>
                        </TouchableHighlight>
                    </View>
                </View> 
            )
        }else if(this.props.pagina == 6){
            return (
                <View style={styles.CadInputView} >
                    <TextInput style={styles.CadInput} placeholderTextColor="black" placeholder="Nome" onChangeText={text => this.setState({nomeCliente: text})} value={this.state.nomeCliente}></TextInput>
                    <TextInput style={styles.CadInput} placeholderTextColor="black" placeholder="Email" onChangeText={text => this.setState({emailCliente: text})} value={this.state.emailCliente}></TextInput>
                    <TextInput secureTextEntry={true} style={styles.CadInput} placeholderTextColor="black" placeholder="Senha" onChangeText={text => this.setState({pswdCliente: text})} value={this.state.pswdCliente}></TextInput>
                    <TextInput style={styles.CadInput} keyboardType='numeric' placeholderTextColor="black" placeholder="CNPJ/CPF" onChangeText={text => this.setState({nrDocumentoCliente: text})} value={this.state.nrDocumentoCliente}></TextInput>
                </View>
            )
        }else if(this.props.pagina == 4){
            return (
                <SafeAreaView style={styles.safeCadTipos}>
                    <ScrollView contentContainerStyle={styles.flexScroll} style={styles.scrollInputed}>
                       {
                           this.state.arrTipos.map(
                               (tipo, index) => {
                                   if(!tipo.includes('|')){
                                    return (
                                        <TouchableOpacity onPress={() => this.selecionarTipo(index, tipo)} key={index} style={styles.tipoTagView}>
                                            <Text style={{color: 'black', fontSize: 24, textAlign: 'center'}}>{tipo}</Text>
                                        </TouchableOpacity>
                                       )
                                   }else{
                                    return (
                                        <TouchableOpacity onPress={() => this.selecionarTipo(index, tipo)} key={index} style={styles.tipoTagView}>
                                            <View style={styles.tipoTagViewView}>
                                                <Text style={{color: 'black', fontSize: 24, textAlign: 'center'}}>{tipo.split('|')[0]}</Text>
                                                <Image source={require('../../assets/check.png')} style={{height: 34, width: 34, position: 'absolute', right: 0}}></Image>
                                            </View>
                                        </TouchableOpacity>
                                       )
                                   }
                               }
                           )
                       } 
                    </ScrollView>
                </SafeAreaView>
            )
        }else{
            return (
                <View style={styles.CadInputView} >
                    <TextInput style={styles.inputConfigs} keyboardType='numeric' placeholderTextColor="black" placeholder="Início do expediente" onChangeText={text => this.setState({inicioExp: text})} value={this.state.inicioExp}></TextInput>
                    <TextInput style={styles.inputConfigs} keyboardType='numeric' placeholderTextColor="black" placeholder="Fim do expediente" onChangeText={text => this.setState({fimExp: text})} value={this.state.fimExp}></TextInput>
                    <TextInput style={styles.inputConfigs} keyboardType='numeric' placeholderTextColor="black" placeholder="Duração do expediente" onChangeText={text => this.setState({duracaoExp: text})} value={this.state.duracaoExp}></TextInput>
                </View>
            )
        }
    }


    render(){
        return (
             <View style={styles.container}>
                {
                    this.renderizarPagina()
                }
            </View>
        )
    }

}


const styles = StyleSheet.create({ 
    container:{
        height: '60%',
        width: '80%',
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        borderRadius: 20
    },
    CadInputView:{
        width:"100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-around',
        height: '100%'
      },
      CadInput: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: "#fff",
        width: "90%",
        height: '10%',
        fontSize: 18
      },
      CadInputDescView:{
        width:"100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        height: '100%'
      },
      CadInputDesc: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: "#fff",
        width: "90%",
        height: '60%'
      },
      safeCadInputed: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
        borderWidth: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      },
      safeCadTipos: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
      },
      flexScroll: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },    
      scrollInputed:{
          width: '90%'
      },
      safeCadInputs:{
        width: '100%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      botaoNewServ:{
        backgroundColor: "#FF473A",
        borderRadius: 20,
        height: "60%",
        width: "70%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      },
      botaoNewServText:{
        color: "#fff",
        fontSize: 20
      },
      inputSafe: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: "#fff",
        width: "60%", 
        marginBottom: '2%',
        height: '30%',
        fontSize: 20
      },
      viewButtons: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '20%',
          width: '90%'
      },
      servicoTagView: {
        width: '90%',
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 5,
        height: 25,
        backgroundColor: '#F6E9D6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    tipoTagView: {
        width: '100%',
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 5,
        height: 70,
        backgroundColor: '#F6E9D6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    tipoTagViewView: {
        width: '90%'
    },
    tipoTagViewActive: {
        width: '90%',
        borderRadius: 15,
        marginBottom: 5,
        marginTop: 5,
        height: 70,
        backgroundColor: '#FF473A',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    viewBtnsInit: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '95%'
    },
    btnsinit: {
        backgroundColor: "#FFF",
        borderRadius: 20,
        height: "25%",
        width: "60%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    btnsinitActive: {
        backgroundColor: "#FF473A",
        borderRadius: 20,
        height: "25%",
        width: "60%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    btnsInitText:{
        color: '#FF473A', 
        fontSize: 18, 
        textAlign: 'center'
    },
    btnsInitTextActive:{
        color: '#FFF', 
        fontSize: 18, 
        textAlign: 'center'
    },
    inputConfigs:{
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: 'center',
        backgroundColor: "#fff",
        width: "90%",
        height: '20%',
        fontSize: 24
    }
});

const mapDispatchtoProps = (dispatch) => {
    return {
        selecionar: (type) => dispatch(SelectTypeCadastro(type))
    }
}

export default connect(null , mapDispatchtoProps)(Stepper);