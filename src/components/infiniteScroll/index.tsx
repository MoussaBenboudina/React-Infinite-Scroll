import { useEffect, useState } from "react";
import Card from "../card.tsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { Data } from "../../type";
import { motion } from "framer-motion";
import Loading from "../loading/index.tsx";

const InfiniteScrollComponent = () => {
  const [data, setData] = useState<Data[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        const newData = jsonData.products.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );

        if (newData.length === 0) {
          setHasMore(false);
        } else {
          setData((prevData) => {
            const uniqueData = newData.filter(
              (item: Data) =>
                !prevData.some((prevItem) => prevItem.id === item.id)
            );
            return [...prevData, ...uniqueData];
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [page]);

  const loadMoreData = () => {
    const delay = 1200;
    setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, delay);
  };

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={hasMore}
      loader={
        <h4 className="w-full text-center pb-8 text-2xl">
          <Loading />
        </h4>
      }
      endMessage={
        <h4 className="w-full text-center pb-8 text-2xl">
          No more items to display
        </h4>
      }
    >
      <div className="w-full grid overflow-hidden grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 flex-wrap gap-6 justify-center items-center ">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.03 }}
          >
            <Card key={item.id} item={item} />
          </motion.div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollComponent;
