import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavoriteContext } from "../store/context/favorites-context";
function MealDetailScreen({ route, navigation }) {
  const favoriteMealsCtx = useContext(FavoriteContext);

  const mealId = route.params.mealId;
  const displayMealDetails = MEALS.find((mealItem) => mealItem.id === mealId);
  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
  function changeFavoriteStatusHandler() {
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealIsFavorite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: displayMealDetails.imageUrl }}
      />
      <Text style={styles.title}>{displayMealDetails.title}</Text>
      <MealDetails
        duration={displayMealDetails.duration}
        complexity={displayMealDetails.complexity}
        affordability={displayMealDetails.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle> Ingredients </Subtitle>
          <List data={displayMealDetails.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={displayMealDetails.steps} />
        </View>
      </View>
    </ScrollView>
  );
}
export default MealDetailScreen;
const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    width: "80%",
  },
});
