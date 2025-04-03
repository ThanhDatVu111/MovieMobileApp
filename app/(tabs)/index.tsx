import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

const Index = () => {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));
  //We did NOT pass a second parameter (autoFetch), so it defaults to true.
  //This means the hook automatically calls fetchMovies() once when the component mounts. That's why movies load immediately.

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
        {/* set the app logo */}
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {/* check if we can fetch the data or not */}
        {moviesLoading ? (
          //if the data is loading, show a loading spinner
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          //if there is an error, show the error message
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Latest Movies
            </Text>
            {/* The FlatList component is used to render a list of movie cards. */}
            <FlatList
              data={movies}
              /*Let’s say item is:
                {
                  id: 1,
                  title: "Avengers",
                  poster_path: "/abc.jpg",
                  vote_average: 8.5,
                  release_date: "2019-04-24"
                }

                <MovieCard {...item} />
                ==>
                <MovieCard
                  id={1}
                  title="Avengers"
                  poster_path="/abc.jpg"
                  vote_average={8.5}
                  release_date="2019-04-24"
                />*/

              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Index;