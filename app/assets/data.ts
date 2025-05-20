import { IoIosChatboxes } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { GiInjustice } from "react-icons/gi";

const data = {
    cards: [
        {
            id: 1,
            name: "Chat with AI",
            description: "Chat with AI Legal Assistant. Get instant answers to your legal questions, draft documents, and receive guidance 24/7.",
            icon: IoIosChatboxes,
            link: "/chat",
            buttonLable: "Chat Now"
        },
        {
            id: 2,
            name: "Explore the Constitution",
            description: "Understand the Indian Constitution. Explore its articles, amendments, and provisions with ease.",
            icon: MdExplore,
            link: "/constitution",
            buttonLable: "Explore Now"
        },
        {
            id: 3,
            name: "Legal Trivia",
            description: "Test Your Legal Knowledge with Trivia. Challenge yourself with fun and informative legal trivia questions.",
            icon: GiInjustice,
            link: "/trivia",
            buttonLable: "Try Now"
        }
    ]
};

export default data;