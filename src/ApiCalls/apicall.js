import axios from "axios";

export const fetchPokemon = (offset) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`
      );
      resolve(response);
    } catch (err) {
      reject(err?.message || "something went wrong");
    }
  });
};

export const getPokemonDetails = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/berry/${id}/`);
      resolve(res);
    } catch (err) {
      reject(err.message || "Something went wrong");
    }
  });
};

export const fetchForms = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-form/${id}/`
      );
      resolve(response);
    } catch (err) {
      reject(err?.message || "something went wrong");
    }
  });
};
