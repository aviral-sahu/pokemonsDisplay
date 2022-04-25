import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPokemon } from "../ApiCalls/apicall";
import "../Styles/style.css";

let timeOut = null;

const Pokemon = () => {
  const [offset, setOffset] = useState(0);
  const [pokemonData, setPokemonData] = useState([]);
  const [listData, setListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchvalue] = useState(0);

  useEffect(() => {
    fetchList();
  }, [offset]);

  useEffect(() => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      if (typeof searchValue === "number") return;
      const value = searchValue.trim();
      let filteredList = pokemonData?.data?.results?.filter((ele) => {
        return ele.name.includes(value);
      });
      setListData(filteredList || []);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [searchValue]);

  const fetchList = () => {
    setLoading(true);
    fetchPokemon(offset)
      .then((res) => {
        // console.log(res);
        setPokemonData(res);
        setListData(res?.data?.results || []);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  return (
    <div className="outer-container">
      <div className="header">
        <input
          placeholder="search"
          onChange={(e) => setSearchvalue(e.target.value)}
        />
      </div>
      {listData.map((ele, i) => {
        return (
          <div className="pokemon-list" key={"pokemon" + i}>
            <Link
              to={`/details/${ele.url.slice(-2, -1)}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {offset + i + 1}. {ele.name}
            </Link>
          </div>
        );
      })}
      <div className="footer">
        <button
          disabled={!pokemonData?.data?.previous || loading}
          onClick={() => {
            setOffset((prevValue) => prevValue - 20);
          }}
        >
          {"<< Previous"}
        </button>
        <div>{`page ${offset / 20 + 1} out of ${Math.ceil(
          pokemonData?.data?.count / 20
        )}`}</div>
        <button
          disabled={!pokemonData?.data?.next || loading}
          onClick={() => {
            setOffset((prevValue) => prevValue + 20);
          }}
        >
          {"Next >>"}
        </button>
      </div>
    </div>
  );
};
export default Pokemon;
