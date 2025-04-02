import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";

const Index = () => {
  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      {/*The background image is set to cover the entire screen and is positioned behind all other elements.*/}
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        {/*set the app logo*/}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
          {/*set up search bar*/}
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Please search for your fav movie"
            />
          </View>
      </ScrollView>
    </View>
  );
};

export default Index;