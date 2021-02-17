import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

export default class Dictionary extends Component{
    constructor(){
        super();
        this.state={
            text: "",
            isSearchPressed: false,
            word : "Loading...",
            defination : ""
        }
    }
    getWord=(word)=>{
        var searchKeyword=word.toLowerCase()
        var url = "https:rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
        //console.log(url)
        return fetch(url)
        .then((data)=>{
            if(data.status===200)
            {
                return data.json()
            }
            else
            {
                return null
            }
        })
        .then((response)=>{
            var responseObject=response
            if(responseObject){
                var wordData=responseObject.definitions[0]
                var definition=wordData.description
                var lexicalCategory=wordData.wordtype

                this.setState({
                    "word":this.state.text,
                    "definition":definition,
                    "lexicalCategory":lexicalCategory

                })
            }
            else
            {
                this.setState({
                    "word":this.state.text,
                    "definition":"Not Found",

                })}
        })
    }
    render(){
        return(
        <View>
            <TextInput 
                style={styles.inputBox}
                placeholder="Enter word"
                onChangeText={text => {
                    this.setState({
                        text: text,
                    });
                }}
                value={this.state.text}
            />

            <TouchableOpacity
                style={styles.searchButton}
                onPress={() => {
                    this.setState({ isSearchPressed: true });
                    this.getWord(this.state.text)
            }}>
                <Text style={{fontSize:20}}><i>Search</i></Text>
            </TouchableOpacity>

           <View><Text style={{textAlign:'center'}}>{this.state.definition}</Text></View>
           
           <View style= {styles.textContainer}>
                <Text style={{color: 'white', padding: 20, fontSize: 22, fontWeight: 'bold', textAlign: 'center',}}>Dictionary</Text>
           </View>

        </View>       
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 160,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 1,
        outline: 'none',
    },
    searchButton: {
        width: 100,
        height: 100,
        textAlign: 'center',
        alignSelf: 'center',
    },
    textContainer: {
        backgroundColor:'blue',
        top: -485,
        marginRight: 1380
    }
})