import { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import BookDetail from "../components/BookDetail";

function IconButton({ onPress, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={[({ pressed }) => pressed && styles.pressed, { paddingRight: 30 }]}
    >
      <Ionicons name="heart" size={24} color={color} />
    </Pressable>
  );
}

const BookDetailsScreen = ({ route, navigation }) => {
  const { bookId } = route.params;
  let imageLink;
  let title;
  let authors;
  let language;
  let publisher;
  let publishedDate;
  let pages;
  let matRating;
  let categories;
  let type;
  let height;
  let width;
  let thickness;

  const [bookData, setBookData] = useState([]);
  const [like, setLike] = useState(false);

  function headerButtonPressHandler() {
    setLike(!like);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (like) {
          // console.log("favourite");
          return <IconButton onPress={headerButtonPressHandler} color="red" />;
        } else {
          // console.log("not favourite");
          return <IconButton onPress={headerButtonPressHandler} color="#ccc" />;
        }
      },
    });
  }, [navigation, headerButtonPressHandler]);

  useEffect(() => {
    const res = axios
      .get(
        "https://www.googleapis.com/books/v1/volumes/" +
          bookId +
          "?key=AIzaSyA6Ls27tf7tNn5-t8E3R843qaLSVN8Vo_Q"
      )
      .then((res) => {
        setBookData(res.data.volumeInfo);
      })
      .catch((err) => console.log(err));
  }, [bookId]);

  if (bookData) {
    if (bookData.imageLinks?.hasOwnProperty("large")) {
      imageLink = bookData.imageLinks.large.replace("http", "https");
    } else {
      imageLink = bookData?.imageLinks?.thumbnail?.replace("http", "https");
    }

    title = bookData.title;
    authors = bookData.authors?.toString()?.replaceAll(",", ", ");
    language = bookData.language;
    publisher = bookData.publisher;
    publishedDate = bookData.publishedDate;
    pages = bookData.pageCount;
    matRating = bookData.maturityRating?.toLowerCase().replace("_", " ");
    categories = bookData.categories;
    type = bookData.printType?.toLowerCase();
    height = bookData.dimensions?.height;
    width = bookData.dimensions?.width;
    thickness = bookData.dimensions?.thickness;

    return (
      <BookDetail
        image={imageLink}
        title={title}
        authors={authors}
        language={language}
        pub={publisher}
        date={publishedDate}
        pages={pages}
        matRating={matRating}
        categories={categories}
        type={type}
        height={height}
        width={width}
        thickness={thickness}
        desc={bookData.description}
      />
    );
  }
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
