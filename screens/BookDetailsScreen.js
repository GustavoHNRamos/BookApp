import { useEffect, useState, useLayoutEffect, useContext } from "react";
import { StyleSheet, Pressable } from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { REACT_APP_API_KEY } from "@env";
import { prisma } from "..";

import BookDetail from "../components/BookDetail";
import { FavouritesContext } from "../store/context/favourites-context";

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
  const favouriteBooksCtx = useContext(FavouritesContext);
  const { bookId } = route.params;
  const [bookData, setBookData] = useState([]);
  const [like, setLike] = useState(false);

  let image;
  let title;
  let authors;
  let language;
  let pub;
  let date;
  let pages;
  let matRating;
  let categories;
  let type;
  let height;
  let width;
  let thickness;
  let desc;

  useEffect(() => {
    const res = axios
      .get(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${REACT_APP_API_KEY}`
      )
      .then((res) => {
        setBookData(res.data.volumeInfo);
      })
      .catch((err) => console.log(err));
  }, [bookId]);

  if (bookData?.imageLinks?.hasOwnProperty("large")) {
    image = bookData?.imageLinks?.large?.replace("http", "https");
  } else {
    image = bookData?.imageLinks?.thumbnail?.replace("http", "https");
  }

  title = bookData?.title;
  authors = bookData?.authors?.toString()?.replaceAll(",", ", ");
  language = bookData?.language;
  pub = bookData?.publisher;
  date = bookData?.publishedDate;
  pages = bookData?.pageCount;
  matRating = bookData?.maturityRating?.toLowerCase().replace("_", " ");
  categories = bookData?.categories;
  type = bookData?.printType?.toLowerCase();
  height = bookData?.dimensions?.height;
  width = bookData?.dimensions?.width;
  thickness = bookData?.dimensions?.thickness;
  desc = bookData?.description
    ?.replaceAll("<p>", "")
    .replaceAll("</p>", "")
    .replaceAll("<i>", "")
    .replaceAll("</i>", "")
    .replaceAll("<br>", "\n")
    .replaceAll("</br>", "")
    .replaceAll("<b>", "")
    .replaceAll("</b>", "")
    .replaceAll("<ul>", ",")
    .replaceAll("</ul>", ".")
    .replaceAll("<li>", "")
    .replaceAll("</li>", "")
    .replace("Note: " || "note: ", "");

  // const createBookQuery = async function (props) {
  //   const bookDb = await prisma.book.create({
  //     data: {
  //       book_id: bookId,
  //       image: props.image,
  //       title: props.title,
  //       authors: props.authors,
  //       language: props.language,
  //       pub: props.pub,
  //       date: props.date,
  //       pages: props.pages,
  //       matRating: props.matRating,
  //       categories: props.categories,
  //       type: props.type,
  //       height: props.height,
  //       width: props.width,
  //       thickness: props.thickness,
  //       desc: props.desc,
  //     },
  //   });
  // };

  // const removeBookQuery = async function ({ id }) {
  //   const bookDb = await prisma.book.delete({
  //     where: {
  //       book_id: bookId,
  //     },
  //   });
  //   console.log(bookDb);
  // };

  const bookIsFavorite = favouriteBooksCtx.ids.includes(bookId);

  function headerButtonPressHandler() {
    setLike(!like);
    if (bookIsFavorite) {
      favouriteBooksCtx.removeFavourite(bookId);
    } else {
      favouriteBooksCtx.addFavourite(bookId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            color={bookIsFavorite ? "red" : "#ccc"}
          />
        );
      },
      headerTitle: title,
    });
  }, [navigation, headerButtonPressHandler]);

  if (bookData) {
    return (
      <BookDetail
        image={image}
        title={title}
        authors={authors}
        language={language}
        pub={pub}
        date={date}
        pages={pages}
        matRating={matRating}
        categories={categories}
        type={type}
        height={height}
        width={width}
        thickness={thickness}
        desc={desc}
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
