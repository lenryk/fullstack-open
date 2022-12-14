import { View, StyleSheet, Text, ScrollView } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text>Repositories</Text>
        </Link>
        <Link to="/sign-in">
          <Text> Sign In</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
