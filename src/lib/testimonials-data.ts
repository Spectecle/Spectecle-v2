export const testimonials = [
  {
    quote: "From the get-go, the team at Spectecle took the time to understand my brand and what I wanted to achieve with my site. They designed a sleek, modern website that's easy to navigate and looks great on both desktop and mobile.",
    name: "Hassan MB",
    role: "Business Owner",
  },
  {
    quote: "Honestly, they outdid my expectations. Not only are they incredibly talented at what they do, but their attention to detail, creativity, and communication throughout the process made everything smooth from start to finish. The design was clean, modern, and exactly what I had envisioned, actually, better.",
    name: "Ali Saab",
    role: "Google Review",
  },
  {
    quote: "The team at Spectecle was fantastic! They answered all my questions and gave me insight into what would work best for my business and my budget. They went above and beyond expectations.",
    name: "Tim Kwiatkowski",
    role: "Business Owner",
  },
  {
    quote: "This company has exceeded all my expectations. Walid was able to take the time to understand my business and delivered a website that is not only visually stunning but also highly functional. Their SEO strategy improved my online visibility and I saw real traffic growth within weeks. Communication was clear and professional throughout the entire process.",
    name: "Mohamed Reda",
    role: "Google Review",
  },
  {
    quote: "Walid is a great website designer. Easy to work with, fast, and the site looks clean and works well. I highly recommend him.",
    name: "Hussein Saab",
    role: "Google Review",
  },
  {
    quote: "I had been needing to update my website and didn't know where to start. Walid made the process so simple. I'm so happy I went with him and highly recommend that everyone does the same!",
    name: "Neda Mohiedeen",
    role: "Attorney, MI Family Lawyer",
  },
  {
    quote: "The whole process was great. We started with a consultation where I shared my ideas for the site, and they did an amazing job bridging the gap between my vision and my lack of web experience. They were quick to respond to any last-minute ideas I had and super easy to work with. The website turned out phenomenal and has definitely helped me come across as a more reputable business.",
    name: "Yusuf M.",
    role: "Google Review",
  },
  {
    quote: "Great designer, responsive, high quality work. Highly recommend.",
    name: "Hassan Saab",
    role: "Owner, Vue Optometry",
  },
  {
    quote: "Honestly, one of the greatest people I have had the honor of doing business with. Walid has the cleanest work I have ever seen. Every time a client of mine visits my website, they compliment the way it looks. I had a vision that I did not think was possible to achieve, and he gave me my vision PLUS more. If you want a website that works, looks good, and gets the job done, you're in the RIGHT place.",
    name: "Abeer",
    role: "Owner, Glam by Abeer",
  },
  {
    quote: "Walid did an excellent job building our new website from start to finish. He was professional, responsive, and always quick to make updates. His communication was excellent, his attention to detail was outstanding, and the final website exceeded our expectations.",
    name: "Dearborn Cleaners",
    role: "Client, Dearborn Cleaners LLC",
  },
];

export const marqueeTestimonials = testimonials.map((t) => ({
  author: { name: t.name, handle: t.role },
  text: t.quote,
}));
