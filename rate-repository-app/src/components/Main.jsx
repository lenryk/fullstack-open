import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import { Route, Routes, Navigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <>
      <AppBar />
      <View style={styles.container}>
        <Routes>
          <Route path="/" element={<RepositoryList />} exact />
          <Route path="/sign-in" element={<SignIn />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
