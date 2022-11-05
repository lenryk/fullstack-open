import { Button, View } from "react-native";
import FormikTextInput from "./FormikTextInput";

const SignIn = ({ handleSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button
        onPress={handleSubmit}
        title="Sign In"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default SignIn;
