import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { icons } from "@/constants/icons";

//The component expects to receive a Movie object as props, which contains the movie's id, poster_path, title, vote_average, and release_date.
const MovieCard = ({
  id,
  poster_path,
  title,
  vote_average,
  release_date,
}: Movie) => {
  return (
    //The Link component is used to navigate to the movie details screen when the user taps on the movie card.
    <Link href={`/movie/${id}`} asChild>
      {/*TouchableOpacity is used to create a button-like component that can be touch with a "fade-out" effect when pressed..*/}
      <TouchableOpacity className="w-[30%]">
        {/*The Image component is used to display the movie's poster. 
        Check the The source URI with the posterpath to see if the image existed, 
        and a placeholder image is used if poster_path is not available.*/}
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        {/* display the movie title. */}
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        {/* display the movie rating. */}
        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>
        
        {/* display the movie release date and type. */}
        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
