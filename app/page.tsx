import Link from "next/link";
import legal from "./assets/Sarnath.png";
import data from "./assets/data";
import * as motion from "motion/react-client";
import { MdArrowForwardIos } from "react-icons/md";

export default function Landing() {
  return (
    <>
      <div className="overflow-hidden h-screen relative">
        <motion.img
          src={legal.src}
          alt="Sarnath"
          className="absolute inset-0 mx-auto my-auto h-full pointer-events-none select-none z-[-1] object-contain translate-y-20"
          initial={{ opacity: 0, scale: 1.1, y: 60 }}
          animate={{ opacity: 0.65, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <motion.div
          className="flex flex-col justify-center sm:justify-between sm:flex-row gap-30 items-center h-full py-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="flex flex-col items-center text-center gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <h1 className="text-6xl text-primary font-[family-name:var(--font-cinzel)]">
                Verdicta
              </h1>
              <div>Your AI-powered legal assistant</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              Chat with AI Legal Assistant. <br />
              Understand the Indian Constitution. <br />
              Test Your Legal Knowledge with Trivia.
            </motion.div>
          </div>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            This assistant offers insights, not decisions.
            <br />
            No algorithm can match your lawyer’s precision.
            <br />
            Consult the wise when stakes are high
            <br />
            Machines may help, but humans apply
          </motion.div>
        </motion.div>
      </div>

      <div className="bg-foreground/10 p-10">
        <motion.div
          className="text-center text-4xl font-[family-name:var(--font-cinzel)] mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Services of Verdicta
        </motion.div>
        <div className="flex flex-col sm:flex-row justify-between gap-5">
          {Array.isArray(data?.cards) &&
            data.cards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  className="w-full p-3 flex flex-col gap-5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 + idx * 0.2 }}
                >
                  <motion.div
                    className="flex flex-col gap-2"
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + idx * 0.2 }}
                  >
                    <Icon className="text-5xl text-primary mb-3" />
                    <div className="text-3xl font-[family-name:var(--font-cinzel)]">
                      {card.name}
                    </div>
                    <div className="text-foreground/80">{card.description}</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + idx * 0.2 }}
                  >
                    <Link
                      href={card.link}
                      className="flex items-center justify-center bg-primary/40 px-2 py-1 font-medium w-fit text-base group"
                    >
                      {card.buttonLable}
                      <MdArrowForwardIos
                        className="ml-2
                      group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </Link>
                  </motion.div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </>
  );
}
