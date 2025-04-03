import { View, TextInput, Image } from "react-native";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      {/* The search icon is displayed on the left side of the search bar */}
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      {/* The TextInput component is used for user input, with a placeholder text */}
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
