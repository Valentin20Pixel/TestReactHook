import React, { useState } from 'react';
import {StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator, Text} from 'react-native';
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBAPI';

const Search = () => {

  const [_films, setFilms] = useState();
  
  const [_searchedText, setSearchedText] = useState("");

  const [_isLoading, setIsLoading] = useState(false);

  const [_page, setPage] = useState(0)

  const [_totalPages, setTotalPages] = useState(0)

  function _displayLoading() {
    if(_isLoading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large'/>
        </View>
      )
    }
  }

  function _loadFilms(){
    setIsLoading(true)
    if (_searchedText.length>0) {
    getFilmsFromApiWithSearchedText(_searchedText, (page+1)).then(data=> {setpage(data.page),setTotalPages(data.total_pages) ,setFilms[...films, ...data.results],setIsLoading(false)});
  };
}

    return(
      <View style={styles.main_container}>
        <TextInput
        style={styles.textinput}
        placeholder="Titre du film"
        onChangeText={(text) => setSearchedText(text)}
        onSubmitEditing={() => _loadFilms()}
        />
        <Button style={styles.button} title="Rechercher" onPress={() => _loadFilms()}/>
        <FlatList
          data={_films}
          keyExtractor={(item, index) => {return index.toString();}}
          onEndReachedThreshold={0.5}
          onEndReached={() => console.log("onEndReached")}
          renderItem={({item, index}) => <FilmItem film={item}/>}
        />
        {_displayLoading()}
      </View>
    );
};

const styles = StyleSheet.create({
  main_container: {
    marginTop: 20,
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
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