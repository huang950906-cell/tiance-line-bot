const activityImageUrls = [
  "https://res.cloudinary.com/bl7fhm9c/image/upload/v1783491150/activity1_fqe5v5.jpg",
  "https://res.cloudinary.com/bl7fhm9c/image/upload/v1783491150/activity3_ya6pfs.jpg",
  "https://res.cloudinary.com/bl7fhm9c/image/upload/v1783491151/activity6_bviiyu.jpg",
  "https://res.cloudinary.com/bl7fhm9c/image/upload/v1783491151/activity5_gmmgcx.jpg",
  "https://res.cloudinary.com/bl7fhm9c/image/upload/v1783491151/activity2_hblfck.jpg",
  "https://res.cloudinary.com/bl7fhm9c/image/upload/v1783491151/activity4_peredy.jpg",
];

const activityFlexMessage = {
  type: "flex",
  altText: "天策活動登記｜查看目前活動內容",
  contents: {
    type: "carousel",
    contents: activityImageUrls.map((imageUrl) => ({
      type: "bubble",
      size: "giga",
      hero: {
        type: "image",
        url: imageUrl,
        size: "full",
        aspectRatio: "2:3",
        aspectMode: "cover",
      },
    })),
  },
};

module.exports = {
  activityFlexMessage,
};
