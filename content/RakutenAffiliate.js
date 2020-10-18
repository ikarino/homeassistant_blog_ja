import React from "react";

const styleAnchor = {
  width: "100%",
  maxWidth: "600px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  color: "black",
  borderStyle: "solid",
  borderColor: "black",
  padding: "20px",
  backgroundColor: "white",
};

const styleImg = {
  width: "50%",
  objectFit: "contain",
};

const styleDescription = {
  width: "50%",
};

function RakutenAffiliate({ url, imgurl, title, value, value_date }) {
  return (
    <a href={url} style={styleAnchor}>
      <img src={imgurl} alt={title} style={styleImg} />
      <div style={styleDescription}>
        {title.slice(0, 20)}...
        <br />
        <b>{value}</b>
        <br />
        {value_date}
      </div>
    </a>
  );
}

export default RakutenAffiliate;
