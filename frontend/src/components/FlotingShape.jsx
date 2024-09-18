import { motion } from "framer-motion"

const FlotingShape = ({ color, size, top, left, delay }) => {
    return (
        <motion.div
            className={`absolute rounded-full ${color} ${size} opacity-15 blur-md`}
            style={{ top, left }}
            animate={{
                y: ["0%", "100%", "0%"],
                x: ["0%", "100%", "0%"],
                rotate: [0, 360]
            }}
            transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                delay,
            }}
            aria-hidden="true"
        />
    )
}


export default FlotingShape
