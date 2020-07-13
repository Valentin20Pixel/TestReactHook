import React, { useState } from 'react';
import {StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBAPI';

const Search = () => {

  const [_films, setFilms] = useState([]);
  
  const [_searchedText, setSearchedText] = useState("");

  const [_isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [total_pages, setTotal_Pages] = useState(0);

  function _displayLoading() {
    if(_isLoading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  };
  


function _loadFilms(){
    setIsLoading(true);
    if (_searchedText.length>0) {
    getFilmsFromApiWithSearchedText(_searchedText, (page+1))
    .then(data=> {
      setPage(data.page);
      setTotal_Pages(data.total_pages);
      setIsLoading(false);
      setFilms([..._films, ...data.results]);
    })
  };
};

function searchFilms(page, total_pages ,_films){
  page = 0;
  total_pages = 0;
  setFilms([]);
  _loadFilms();
};
    return(
      <View style={styles.main_container}>
        <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={(text) => setSearchedText(text)}
        onSubmitEditing={() => searchFilms()}
        />
        <Button style={styles.button} title="Rechercher" onPress={() => searchFilms()}/>
        <FlatList
          data={_films}
          keyExtractor={(item, index) => {return index.toString();}}
          renderItem={({item, index}) => <FilmItem film={item}/>}
          onEndReachedThreshold={0.25}
          onEndReached={() => {if(page<total_pages)_loadFilms()}}
        />
        {_displayLoading()}
      </View>
    )
};

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  button: {
    height: 50
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Search;
