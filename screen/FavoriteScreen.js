import { StyleSheet, View, Text } from "react-native";
import { FavoriteContext } from "../store/context/favorites-context";
import { useContext } from "react";
import MealList from "../components/mealList/MealsList";
import { MEALS } from "../data/dummy-data";

function FavoriteScreen() {
  const favoriteMealsCtx = useContext(FavoriteContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealsCtx.ids.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.rootContent}>
        <Text style={styles.text}>You have no Favorite meals yet.</Text>
      </View>
    );
  }
  return <MealList items={favoriteMeals} />;
}
export default FavoriteScreen;
const styles = StyleSheet.create({
  rootContent: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
