import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function List() {
  const router = useRouter();
  const [dateQuery, setDateQuery] = useState('取得中');

  useEffect(() => {
    if (router && router.query) {
      setDateQuery(router.query.date as string);
    }
  }, [router]);

  return (
    <>
      <h2>{dateQuery}</h2>
    </>
  );
}

export default List;
