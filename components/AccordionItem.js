import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function AccordionItem({ children, title }) {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  // {expanded ? "Close" : "Open"}

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        {!expanded ? (
          <Ionicons name="chevron-down-outline" size={20} />
        ) : (
          <Ionicons name="chevron-up-outline" size={20} />
        )}
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

export default AccordionItem;

const styles = StyleSheet.create({
  accordContainer: {
    paddingBottom: 4,
    flex: 1,
  },
  accordHeader: {
    padding: 10,
    backgroundColor: "#ccc",
    color: "#eee",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordTitle: {
    fontSize: 16,
  },
  accordBody: {
    padding: 12,
  },
});
