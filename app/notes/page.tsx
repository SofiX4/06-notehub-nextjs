import { fetchNotes } from "@/lib/api";
import NotesClient from "./NotesСlient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface NotesPageProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const search = params.search || "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { page, search }],
    queryFn: () => fetchNotes({ page, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
