import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const BookItems = ({ title, date, image, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.rootContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
          <View style={styles.details}>
            <Text style={styles.text}>{date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default BookItems;

const styles = StyleSheet.create({
  rootContainer: {
    height: 320,
    width: 300,
    backgroundColor: "#ccc",
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 10,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: "stretch",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  textContainer: {
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  text: {
    textAlign: "center",
    color: "#000",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
