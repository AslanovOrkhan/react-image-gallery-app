import {
  FaCamera,
  FaCity,
  FaDog,
  FaLeaf,
  FaPlane,
  FaRegHeart,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import type { Category } from "../types/gallery";
import { FiMonitor } from "react-icons/fi";

export const categories: {
  label: string;
  value: Category;
  icon: typeof FaCamera;
}[] = [
  { label: "All Images", value: "All", icon: FaCamera },
  { label: "Nature", value: "Nature", icon: FaLeaf },
  { label: "Travel", value: "Travel", icon: FaPlane },
  { label: "City", value: "City", icon: FaCity },
  { label: "People", value: "People", icon: FaUser },
  { label: "Animals", value: "Animals", icon: FaDog },
  { label: "Food", value: "Food", icon: FaUtensils },
  { label: "Technology", value: "Technology", icon: FiMonitor },
  { label: "Minimal", value: "Minimal", icon: FaRegHeart },
];
