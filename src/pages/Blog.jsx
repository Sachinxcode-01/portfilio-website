import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import "./blog.css";

export default function Blog() {
  const defaultPosts = [
    {
      id: 1,
      title: "My Journey From Beginner to Building AI Projects",
      text: "Starting from basic Python prints to building cancer detection and ISL interpreter projects, I realized one thing — consistency beats everything. Every small project I built made me believe more in the power of learning and patience.",
    },
    {
      id: 2,
      title: "Why I Love Full-Stack Development",
      text: "Designing the school website project taught me how frontend creativity and backend logic work like a perfect combination. For me, the joy comes from turning ideas into a real working product that people can use.",
    },
    {
      id: 3,
      title: "Technology Changed My Confidence",
      text: "I was not someone who knew everything from day one. But the more I coded, the more I understood myself. Tech taught me discipline, problem-solving, and that growth happens silently — line by line.",
    },
    {
      id: 4,
      title: "Building My Future in CSE",
      text: "From machine learning models to web development, every project I create takes me one step closer to becoming the engineer I dream to be. I believe in learning daily, improving daily, and building a future I'm proud of.",
    },
    {
      id: 5,
      title: "Hackathon 2026: A Weekend of Innovation",
      text: "Participating in Hackathon 2026 was a turning point. Working with a team of like-minded individuals to solve real-world problems in just 48 hours was intense but incredibly rewarding. It showed me the power of collaboration and fast-paced development.",
    },
    {
      id: 6,
      title: "The Rise of Generative AI",
      text: "Generative AI is not just a trend; it's a tool that's redefining how we create. From my GenAI workshop experience, I've realized that understanding these models is crucial for any modern engineer. I'm excited to keep exploring this frontier.",
    },
    {
      id: 7,
      title: "Open Source: Sharing is Learning",
      text: "Setting up my GitHub and sharing my projects has taught me that the developer community is built on openness. Getting feedback and seeing how others solve the same problems has accelerated my learning journey significantly.",
    },
    {
      id: 8,
      title: "Philosophy of a First-Year CSE Student",
      text: "Being in my first year at REC Hulkoti, everything is new and exciting. My simple philosophy? Stay curious, don't be afraid to break things, and always keep the 'Hello World' spirit alive — no matter how complex the project gets.",
    },
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem("kd_blog_votes") || "{}");
    const votedByUser = JSON.parse(localStorage.getItem("kd_blog_voted") || "{}");
    const withVotes = defaultPosts.map((p) => ({
      ...p,
      agree: savedVotes[p.id]?.agree || 0,
      disagree: savedVotes[p.id]?.disagree || 0,
      userVote: votedByUser[p.id] || null,
    }));
    setPosts(withVotes);
  }, []);

  function vote(id, type) {
    const votedByUser = JSON.parse(localStorage.getItem("kd_blog_voted") || "{}");
    if (votedByUser[id]) return;

    const next = posts.map((p) =>
      p.id === id ? { ...p, [type]: p[type] + 1, userVote: type } : p
    );
    setPosts(next);

    const votes = Object.fromEntries(
      next.map((p) => [p.id, { agree: p.agree, disagree: p.disagree }])
    );
    localStorage.setItem("kd_blog_votes", JSON.stringify(votes));
    localStorage.setItem(
      "kd_blog_voted",
      JSON.stringify({ ...votedByUser, [id]: type })
    );
  }

  return (
    <motion.section
      className="blog-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        className="blog-title"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        📝 My Blog
      </motion.h2>
      <p className="blog-sub">
        My thoughts, experiences, growth, and tech journey — react if you feel it!
      </p>

      <div className="blog-grid">
        {posts.map((p, idx) => (
          <motion.div
            key={p.id}
            className="blog-post"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            <h3 className="post-title">{p.title}</h3>
            <p className="post-text">{p.text}</p>

            <div className="vote-container">
              <motion.button
                onClick={() => vote(p.id, "agree")}
                disabled={!!p.userVote}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                aria-label={`Agree with "${p.title}" (${p.agree} votes)`}
                className={`vote-btn-circle agree ${
                  p.userVote === "agree" ? "active" : ""
                }`}
              >
                <ThumbsUp size={20} />
                <motion.span
                  key={p.agree}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vote-count"
                >
                  {p.agree}
                </motion.span>
              </motion.button>

              <motion.button
                onClick={() => vote(p.id, "disagree")}
                disabled={!!p.userVote}
                whileTap={{ scale: 0.85 }}
                whileHover={{ scale: 1.15 }}
                aria-label={`Disagree with "${p.title}" (${p.disagree} votes)`}
                className={`vote-btn-circle disagree ${
                  p.userVote === "disagree" ? "active" : ""
                }`}
              >
                <ThumbsDown size={20} />
                <motion.span
                  key={p.disagree}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="vote-count"
                >
                  {p.disagree}
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
