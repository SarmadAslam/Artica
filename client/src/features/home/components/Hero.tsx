import { Button } from "../../../components/ui/button";
import { HeroCards } from "./HeroCards";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#421983] to-[#F35E21] text-transparent bg-clip-text">
              Empowering Artists,
            </span>{" "}
          </h1>{" "}
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#FFD700] to-[#F35E21] text-transparent bg-clip-text">
              Enriching Creativity
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          RungLey connects talented artists with clients worldwide, offering a
          platform to showcase, bid, and earn from their unique creations.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3 bg-[#421983] hover:bg-[#F35E21] text-white">
            Join as an Artist
          </Button>
          <Button
            variant="outline"
            className="w-full md:w-1/3 border-[#F35E21] text-[#F35E21] hover:bg-[#F35E21] hover:text-white"
          >
            Explore Artwork
          </Button>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
