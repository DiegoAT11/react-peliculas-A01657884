import { useEffect, useState } from "react";
import { IMovieDetail } from "@/types/MovieDetail";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

interface MovieCarouselProps {
    movies: IMovieDetail[];
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
    const router = useRouter();
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [scrollBy, setScrollBy] = useState(1);


    const navigate = (id: number) => {
        router.push(`/movie/${id}`);
    };

    useEffect(() => {
        const updateScrollBy = () => {
            if (window.matchMedia("(min-width: 1280px)").matches) {
                setScrollBy(5);
            } else if (window.matchMedia("(min-width: 1024px)").matches) {
                setScrollBy(3);
            } else if (window.matchMedia("(min-width: 768px)").matches) {
                setScrollBy(2);
            } else {
                setScrollBy(1);
            }
        };
        updateScrollBy();
        window.addEventListener("resize", updateScrollBy);
        return () => window.removeEventListener("resize", updateScrollBy);
    }, []);

    const handleScrollNext = () => {
        if (!api) return;
        const current = api.selectedScrollSnap();
        const next = Math.min(current + scrollBy, api.scrollSnapList().length - 1);
        api.scrollTo(next);
    };

    const handleScrollPrev = () => {
        if (!api) return;
        const current = api.selectedScrollSnap();
        const prev = Math.max(current - scrollBy, 0);
        api.scrollTo(prev);
    };

    return (
        <Carousel
            opts={{
                align: "start",
            }}
            setApi={setApi}
            className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-6xl mx-auto"
        >
            <CarouselContent>
                {movies.map((movie) => (
                    <CarouselItem key={movie.id} className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/5 hover:scale-105 transition-transform">
                        <div className="p-2 cursor-pointer" onClick={() => navigate(movie.id)}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                width={300}
                                height={450}
                                className="rounded-t-3xl object-cover"
                                alt={movie.title}
                            />
                            <div className="mt-2">
                                <h4 className="text-base font-semibold ">{movie.title}</h4>
                                <p className="text-sm text-gray-500 inline-flex items-center gap-1">
                                    <Star className="fill-yellow-400 w-5 h-5 stroke-0" />
                                    {movie.vote_average.toFixed(1)}
                                </p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious onClick={handleScrollPrev} />
            <CarouselNext onClick={handleScrollNext} />
        </Carousel>
    );
};

export default MovieCarousel;



