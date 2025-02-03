import { TypeCategory } from "./TypeCategory";

/**
 * カウント値データをすべて保持する型
 */
export type TypeCounts = Record<TypeCategory, { key: number; count: number }[]>;
