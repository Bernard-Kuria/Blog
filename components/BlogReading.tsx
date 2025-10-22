import Image from "next/legacy/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BlogArea() {
  return (
    <div className="flex flex-col gap-[20px] page-layout h-[1170px] p-[100px] bg-white dark:bg-black blog-text">
      <div className="flex detail-text">
        <div className="flex gap-[10px]">
          <div>Mar 21, 2023</div>
          <div className="w-[0.5px] h-[0.5px] rounded-[0.5px]"></div>
          <div>1 min read</div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-[10px] items-center cursor-pointer">
          <FontAwesomeIcon
            className="icon-size"
            icon={["fas", "share-nodes"]}
          />
          <FontAwesomeIcon className="icon-size" icon={["fas", "download"]} />
        </div>
      </div>
      <div className="blog-title">BLOG TITLE</div>
      <div className="">
        Create a blog post subtitle that summarizes your post in a few short,
        punchy sentences and entices your audience to continue reading.
      </div>
      <div className="relative w-full h-[400px]">
        <Image
          src={`/assets/blogImg/bike-riding.jpg`}
          alt="blog image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex-1">
        Welcome to your blog post. Use this space to connect with your readers
        and potential customers in a way that’s current and interesting. Think
        of it as an ongoing conversation where you can share updates about
        business, trends, news, and more “Do you have a design in mind for your
        blog? Whether you prefer a trendy postcard look or you’re going for a
        more editorial style blog - there’s a stunning layout for everyone.”
        You’ll be posting loads of engaging content, so be sure to keep your
        blog organized with Categories that also allow visitors to explore more
        of what interests them. Create Relevant Content Writing a blog is a
        great way to position yourself as an authority in your field and
        captivate your readers’ attention. Do you want to improve your site’s
        SEO ranking? Consider topics that focus on relevant keywords and relate
        back to your website or business. You can also add hashtags (#vacation
        #dream #summer) throughout your posts to reach more people, and help
        visitors search for relevant content. Blogging gives your site a voice,
        so let your business’ personality shine through. Choose a great image to
        feature in your post or add a video for extra engagement. Are you ready
        to get started? Simply create a new post now.
      </div>
      <div className="flex detail-text">
        <div className="flex gap-[30px]">
          <div>
            <strong>15</strong> views
          </div>
          <div>
            <strong>2</strong> comments
          </div>
          <div>
            <strong>4</strong> downloads
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="flex gap-[10px] items-center">
          3 <FontAwesomeIcon className="icon-size" icon={["far", "heart"]} />
        </div>
      </div>
    </div>
  );
}
