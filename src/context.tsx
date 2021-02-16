import {createContext} from "react";
import {Color} from "./typescript/types";

const PlayingColor = createContext<Color>("WHITE")

export default PlayingColor