import { useRouter } from "next/router";

function List() {
  const router = useRouter();

  return (
    <>
      <h2>{router.query.date}</h2>
    </>
  );
}

export default List;
