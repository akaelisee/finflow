
import { Categories } from "@/types/category";
import { CategoryIcon } from "./categoryIcon";

type Props = {
    badges: Categories;
}

export function CategoryBadge({ badges }: Props) {

    return (
        <div className="p-2 rounded-md" style={{ background: badges.color + '20', color: badges.color }}>
            <CategoryIcon name={badges.icon} size={28} />
        </div>
    )
}

// 