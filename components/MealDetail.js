import { View, Text } from "react-native";
function MealDetail({ ingredients, steps }) {
  return (
    <View>
      <Text>{ingredients}</Text>
      <Text>{steps}</Text>
    </View>
  );
}
export default MealDetail;
