import React from "react";

const images = [
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/group-of-volunteer-forming-huddles-2021-08-28-22-11-23-utc.jpg",
    alt: "A group of people clean up the trash at the exit to the forest, in the spring.",
    caption: "A group of people clean up the trash at the exit to the forest, in the spring.",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/group-of-volunteer-planting-2021-08-28-17-20-48-utc.jpg",
    alt: "Group of volunteer forming huddles in park",
    caption: "Group of volunteer forming huddles in park",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/volunteer-cleaning-beach-2021-09-03-14-56-47-utc.jpg",
    alt: "Group of volunteer planting in park",
    caption: "Group of volunteer planting in park",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/volunteers-2021-08-27-09-40-37-utc.jpg",
    alt: "A volunteer picking garbage at the beach.",
    caption: "A volunteer picking garbage at the beach.",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/volunteers-cleaning-garbage-2021-09-02-02-33-21-utc.jpg",
    alt: "Cheerful environmental volunteers with full trash bags",
    caption: "Cheerful environmental volunteers with full trash bags",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/young-volunteers-picking-up-garbage-in-bag-at-park-2021-08-27-09-25-46-utc.jpg",
    alt: "Team of volunteers cleaning wood from trash",
    caption: "Team of volunteers cleaning wood from trash",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/group-of-volunteer-having-fun-2021-08-28-17-17-39-utc.jpg",
    alt: "Young volunteers picking up garbage in bag on footpath.",
    caption: "Young volunteers picking up garbage in bag on footpath.",
  },
  {
    src: "https://kitpro.site/voltee/wp-content/uploads/sites/54/2021/11/a-group-of-volunteers-are-cleaning-the-environment-2021-09-03-05-57-23-utc.jpg",
    alt: "Group of volunteer having fun in park",
    caption: "Group of volunteer having fun in park",
  },
];

const ActivityGallery = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-4">Activity Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {images.map(({ src, alt, caption }, idx) => (
          <div key={idx} className="group">
            <img
              src={src}
              alt={alt}
              className="w-full h-48 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <p className="mt-2 text-center text-sm italic text-gray-500">{caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ActivityGallery;
