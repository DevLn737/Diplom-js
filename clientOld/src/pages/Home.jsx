import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 text-xl font-bold uppercase text-[#6449ff]">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeOut, setSearchTimeOut] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:4000/api/images/community",
          {
            method: "GET",
            "Content-Type": "application/json",
          },
        );

        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setAllPosts(result.reverse());
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeOut);

    setSearchText(e.target.value);

    setSearchTimeOut(
      setTimeout(() => {
        const searchResultByUsername = allPosts.filter((post) =>
          post.owner.username.toLowerCase().includes(searchText.toLowerCase()),
        );

        const searchResultByDescription = allPosts.filter((post) =>
          post.description.toLowerCase().includes(searchText.toLowerCase()),
        );

        const searchResult = searchResultByUsername.concat(
          searchResultByDescription,
        );

        setSearchedResults(searchResult);
      }, 500),
    );
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">
          Витрина сообщества
        </h1>
        <p className="max-w[500px] mt-2 text-[16px] text-[#666e75]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
          minima blanditiis! Suscipit officiis nulla quae perspiciatis, magnam
          voluptatibus pariatur eaque. Magni officia odio doloribus nesciunt,
          aperiam ipsam! Accusantium, numquam temporibus.
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Поиск публикаций"
          type="text"
          name="text"
          placeholder="Введите что-нибудь..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10 ">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="mb-3 text-xl font-medium text-[#666e75]">
                Результаты поиска для{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="Поиск не дал результатов"
                />
              ) : (
                <RenderCards data={allPosts} title="Не найдено постов" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
