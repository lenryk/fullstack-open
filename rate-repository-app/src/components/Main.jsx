import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import { Route, Routes, Navigate } from "react-router-native";
import { Formik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
});

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
          <Route
            path="/sign-in"
            element={
              <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => console.log(values)}
                validationSchema={validationSchema}
              >
                {({ handleSubmit }) => <SignIn handleSubmit={handleSubmit} />}
              </Formik>
            }
            exact
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;
