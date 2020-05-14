import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import Headercomponent from '../shared/header';
import Calendarcomponent from './Calendarcomponent';
import { connect } from 'react-redux';
import { createCalendarArray } from '../shared/CalendarProcessor';


class HorariosComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            tiles: []
        };
    }

    componentDidMount(){
        this.setState({
            tiles: createCalendarArray(this.props.selectedEstab.configuracoes.inicio, this.props.selectedEstab.configuracoes.fim, this.props.selectedEstab.configuracoes.duracao)
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <Headercomponent cor="branco" titulo="Escolha um horário" />
                <Calendarcomponent/>
                <SafeAreaView style={styles.safeView}>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.list}
                        ItemSeparatorComponent={() => <Text></Text>}
                        data={this.state.tiles}
                        renderItem={({ item }) => <Text>ok</Text>}
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
        justifyContent: 'center',
        height: '96%',
        marginTop: '8%',
        backgroundColor: '#FF473A'
    },
    list:{
        justifyContent: "space-around"
    },
    safeView: {
        height: '80%',
        width: '100%'
    }
})

const mapStatetoProps = (state) => {
    return {
        selectedEstab: state.authReducer.selectedEstab
    }
}

export default connect(mapStatetoProps, null)(HorariosComponent);