import { getTagCounts } from "@/lib/post";
import { Tag } from "@/components/tag";

type Props = {
  items: {
    name: string;
    href: string;
  }[];
};

export async function TagsWithCount({ items }: Props) {
  const tagCounts = await getTagCounts();
  const itemsWithCount = items.map((item) => {
    return {
      ...item,
      count: tagCounts[item.name],
    };
  });

  return (
    <div className="flex flex-wrap gap-3 self-center">
      {itemsWithCount.map((item) => {
        return (
          <div key={item.name}>
            <Tag {...item} />
          </div>
        );
      })}
    </div>
  );
}
