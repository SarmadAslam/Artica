import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2 ">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <LogoIcon />
            RungLey
          </a>
          <p className="text-sm opacity-70 mt-2">
            Empowering artists worldwide by providing opportunities, visibility, and income.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div>
            <a rel="noreferrer noopener" href="https://www.instagram.com/rungley/" className="opacity-60 hover:opacity-100">Instagram</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Facebook</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">LinkedIn</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Twitter</a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Explore</h3>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Portfolio</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Art Bidding</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Competitions</a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Resources</h3>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Blog</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Help Center</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">FAQs</a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Discord</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">YouTube</a>
          </div>
          <div>
            <a rel="noreferrer noopener" href="#" className="opacity-60 hover:opacity-100">Events</a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 RungLey. All rights reserved.
        </h3>
      </section>
    </footer>
  );
};