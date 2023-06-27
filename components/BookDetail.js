import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import AccordionItem from "./AccordionItem";

const BookDetail = ({
  image,
  title,
  authors,
  language,
  pub,
  date,
  pages,
  matRating,
  categories,
  type,
  height,
  width,
  thickness,
  desc,
}) => {
  let description;
  function capitalizeFirstLetter(string) {
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }

  description = desc
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

  return (
    <View style={styles.rootContainer}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: image }}
            style={styles.image}
            borderRadius={10}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
        <View style={{ paddingHorizontal: 30, marginTop: 15 }}>
          {/* authors */}
          <View style={styles.details}>
            <Text>Author{authors?.includes(",") ? "(s)" : ""}: </Text>
            <Text>{authors}</Text>
          </View>
          {/* language */}
          <View style={styles.details}>
            <Text>Language: </Text>
            <Text>{capitalizeFirstLetter(language)}</Text>
          </View>
          {/* publisher */}
          <View style={styles.details}>
            <Text>Publisher: </Text>
            <Text>{pub}</Text>
          </View>
          {/* date */}
          <View style={styles.details}>
            <Text>Release date: </Text>
            <Text>{date}</Text>
          </View>
          {/* pages */}
          <View style={styles.details}>
            <Text>Nº of pages: </Text>
            <Text>{pages}</Text>
          </View>
          {/* maturity rating */}
          <View style={styles.details}>
            <Text>MaturityRating: </Text>
            <Text>{capitalizeFirstLetter(matRating)}</Text>
          </View>
          {/* categories */}
          {categories !== undefined && (
            <View style={styles.details}>
              {categories != undefined && <Text>Categories: </Text>}
              {categories != undefined && (
                <Text style={styles.categoriesText}>{categories}</Text>
              )}
            </View>
          )}
          {/* type */}
          <View style={styles.details}>
            <Text>Type: </Text>
            <Text>{capitalizeFirstLetter(type)}</Text>
          </View>
          {height && width && thickness && (
            <View>
              <View style={styles.details}>
                <Text>Height: </Text>
                <Text>{height}</Text>
              </View>
              <View style={styles.details}>
                <Text>Width: </Text>
                <Text>{width}</Text>
              </View>
              <View style={[styles.details, { borderBottomColor: "#ccc" }]}>
                <Text>Thickness: </Text>
                <Text>{thickness}</Text>
              </View>
            </View>
          )}
          <AccordionItem title="Description">
            <Text>{description}</Text>
          </AccordionItem>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookDetail;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    flexShrink: 1,
    flexDirection: "column",
    paddingBottom: 25,
  },
  imageContainer: {
    width: "100%",
    height: 450,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "95%",
    height: "100%",
    resizeMode: "contain", //contain se for necessário pegar a bordas laterias completas
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  details: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    justifyContent: "space-between",
    alignContent: "space-between",
    borderTopColor: "#ccc",
    borderBottomColor: 0,
    borderRightColor: 0,
    borderLeftColor: 0,
    borderWidth: 1,
  },
  categoriesText: {
    maxWidth: 200,
    textAlign: "right",
  },
});
