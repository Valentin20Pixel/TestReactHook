import React, { useState } from 'react';
import {StyleSheet, View, Button, TextInput, FlatList} from 'react-native';
import FilmData from '../Helpers/FilmsData'
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBAPI';

const Search = () => {

  const [_films, setFilms] = useState()

  function _loadFilms(){
    getFilmsFromApiWithSearchedText("fiction").then(data=> setFilms([data]))

  };
    return(
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Titre du film"/>
        <Button style={styles.button} title="Rechercher"onPress={() => _loadFilms()}/>
        <FlatList
          data={_films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
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
  }
});
export default Search;