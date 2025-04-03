import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";

import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

import useFetch from "@/services/usefetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";

import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/MovieCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies = [],
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);
  // The useFetch hook is called with fetchMovies and searchQuery as arguments.

  // handleSearch is called whenever the user types in the search bar.
  // setSearchQuery updates the searchQuery state with the new text.
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // useEffect is call when searchQuery changes => dont need to use useFetch.
  // If there is a search query, it waits for 500ms after the user stops typing before calling loadMovies to fetch the movies.
  // If the search bar is empty, it clears out the results by calling reset()
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      // ⏱ Code to run after delay 500ms
      if (searchQuery.trim()) {
        await loadMovies();
        // movies?.length! > 0 ensures that the movies array is not empty.
        //movies?.[0] ensures that the first movie exists and is valid.
        if (movies?.length! > 0 && movies?.[0]) {
          await updateSearchCount(searchQuery, movies[0]);
        }
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      {/*The background image is set to cover the entire screen and is positioned behind all other elements.*/}
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      {/* set the app logo */}
      <View className="w-full flex-row justify-center mt-20 items-center">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>

      {/* The FlatList component is used to render a list of movies. */}
      <FlatList
        className="px-5"
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch} // This function is called whenever the user types in the search bar
              />
            </View>

            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "What the heck are you searching for mf?"
                  : "Please search for a movie mf"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;