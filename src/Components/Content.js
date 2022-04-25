import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPokemonDetails, fetchForms } from "../ApiCalls/apicall";

const ContentDetails = () => {
  let { id } = useParams();
  let [images, setImages] = useState({});

  const getPic = async () => {
    try {
      const data = await fetchForms(id);
      // console.log(data,'data')
      setImages(data.data.sprites);
    } catch (err) {
      console.log(err || "Something went wrong");
    }
  };

  const [contentData, setContentData] = useState({});

  const getDetailById = async () => {
    try {
      const data = await getPokemonDetails(id);
      // console.log(data.data);
      setContentData(data.data);
    } catch (err) {
      console.log(err || "Something went wrong");
    }
  };

  useEffect(() => {
    getDetailById();
    getPic();
  }, [id]);
  // console.log(contentData);
  return (
    <div className="content-container" style={{ color: "white" }}>
      <div
        style={{
          display: "flex",
          paddingBottom: "30px",
          flexWrap: "wrap",
          borderBottom: "1px solid lightgrey"
        }}
      >
        {Object.keys(images).map((ele, i) => {
          if (images[ele])
            return (
              <div key={`image_${i}`}>
                <img src={images[ele]} />
                <div>{ele.split("_").join(" ")}</div>
              </div>
            );
        })}
      </div>
      <div
        style={{
          color: "white",
          padding: "10px 0",
          borderBottom: "1px solid lightgrey",
          marginBottom: "30px",
          textAlign: "center"
        }}
      >
        Pokemon Detail
      </div>
      <div>Firmness: {contentData?.firmness?.name}</div>
      <div>
        Flavors:{" "}
        {(contentData?.flavors ?? []).map((e, idx, ar) => (
          <span key={`detail_${idx}`}>
            {e.flavor.name} {ar.length - 1 !== idx && ", "}
          </span>
        ))}{" "}
      </div>
      <div>
        GIFT:
        <div>Type: {contentData?.natural_gift_type?.name}</div>
        <div>Power: {contentData?.natural_gift_power}</div>
      </div>
    </div>
  );
};
export default ContentDetails;
