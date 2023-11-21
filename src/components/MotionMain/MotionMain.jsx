import { motion } from "framer-motion";

function MotionMain(props) {
    return (
        <motion.main
            className="main__container"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 2, type: "spring", stiffness: 100 }}
        >
            {props.children}
        </motion.main>
    )
}

export default MotionMain;