// Verbatim Google reviews (Spectecle - Web Design Agency profile), attributed to
// the reviewer who wrote them. Reviews that name the founder are quoted as
// excerpts ("…" marks the omitted text) because his name must not appear on the site.
export const testimonials = [
  {
    quote: "Every time a client of mine visits my website, they compliment the way it looks when they come in for their appointments. … I had a vision that I did not think was possible to achieve, and he gave me my vision PLUS more. If you want a website that works, looks good, and gets the job done, you're in the RIGHT place.",
    name: "Abeer",
    role: "Owner, Glam by Abeer",
  },
  {
    quote: "Great designer, responsive, high quality work. Highly recommend.",
    name: "Hassan Saab",
    role: "Owner, Vue Optometry",
  },
  {
    quote: "I had been needing to update my website and didn't know where to start. … He was patient throughout the whole process and really helped me with my vision. I'm so happy I went with him and highly recommend that everyone does the same!",
    name: "Neda Mohiedeen",
    role: "Attorney, MI Family Lawyer",
  },
  {
    quote: "They answered all my questions and gave me insight into what would work best for my business and my budget. They went above and beyond expectations and delivered a wonderful design.",
    name: "Tim Kwiatkowski",
    role: "Google review",
  },
];

export const marqueeTestimonials = testimonials.map((t) => ({
  author: { name: t.name, handle: t.role },
  text: t.quote,
}));
