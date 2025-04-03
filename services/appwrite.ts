import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!; //! mean not null
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// Connect to my  Appwrite project using the project ID and endpoint.
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    console.log("Searching for documents with query:", query);
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);
    console.log("Documents found:", result.documents);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      console.log("Updating document with ID:", existingMovie.$id);
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
      console.log("Document updated successfully.");
    } else {
      console.log("No document found. Creating a new document...");
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
      console.log("Document created successfully.");
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
    // The Appwrite SDK might not provide strong TypeScript typings for result.documents, so the developer uses as unknown as TrendingMovie[] to force TypeScript to treat it as an array of TrendingMovie objects.
    // This is a workaround to avoid TypeScript errors when the SDK's typings are incomplete or generic.
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
