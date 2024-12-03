import { Tags } from "@/components/tags";
import { etcTags } from "@/consts/tags";
import { Posts } from "@/components/posts";

const EtcPage = () => {
  return (
    <div>
      <Tags items={etcTags} />
      <Posts />
    </div>
  );
};

export default EtcPage;
