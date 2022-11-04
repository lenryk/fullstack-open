import { Text, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

const RepositoryItem = ({ item }) => {
  console.log(item);
  return (
    <>
      <Image style={styles.logo} source={item.ownerAvatarUrl} />
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </>
  );
};

export default RepositoryItem;
