import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  Pressable,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import BookItems from "../components/BookItems";

const InitialScreen = ({ navigation }) => {
  const [bookSearch, setBookSearch] = useState("");
  const [bookData, setBookData] = useState([]);
  let bookDataArray = [];

  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   isLoading && setTimeout(() => setIsLoading(false), 1500);
  // }, [setIsLoading]);

  function searchInputHandler(enteredBook) {
    setBookSearch(enteredBook);
  }

  async function bookSearchHandler() {
    try {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          bookSearch +
          "&key=AIzaSyA6Ls27tf7tNn5-t8E3R843qaLSVN8Vo_Q"
      );
      res.data.items.forEach((book) => {
        bookDataArray.push(book);
      });
      setBookData(bookDataArray);
      // setIsLoading(true);
    } catch (err) {
      console.log(err);
    }
  }

  function renderBookHandler({ item }) {
    let imageLink = item.volumeInfo.imageLinks?.thumbnail.replace(
      "http",
      "https"
    );

    function navigateHandler() {
      navigation.navigate("BookDetails", { bookId: item.id });
    }

    return (
      <BookItems
        title={item.volumeInfo.title}
        pages={item.volumeInfo.pageCount}
        date={item.volumeInfo.publishedDate}
        image={imageLink}
        author={item.volumeInfo.authors}
        desc={item.volumeInfo.description}
        onPress={navigateHandler}
      />
    );
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search book"
          placeholderTextColor="#bbb"
          onChangeText={searchInputHandler}
          value={bookSearch}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable onPress={bookSearchHandler}>
          <Ionicons name="search" style={styles.searchIcon} size={20} />
        </Pressable>
      </View>

      {bookData && (
        <FlatList
          data={bookData}
          renderItem={renderBookHandler}
          initialNumToRender={30}
          keyExtractor={(item, index) => item.id.concat(index)}
        />
      )}
    </View>
  );
};

export default InitialScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginHorizontal: 25,
  },
  container: {
    marginVertical: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#eee",
    borderRadius: 50,
  },
  searchInput: {
    paddingVertical: Platform.OS === "ios" ? 10 : 5,
    paddingHorizontal: 12,
    flex: 2,
    fontSize: 16,
  },
  searchIcon: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
});
