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

const styleRecommend = {
  color: "black",
  backgroundColor: "white",
  fontSize: "8pt",
  width: "100%",
  maxWidth: "600px",
};

const styleDescription = {
  width: "50%",
};
//          style="float:left;max-height:27px;width:auto;margin-top:5px"
function RakutenAffiliate({ url, imgurl, title, value, value_date }) {
  return (
    <>
      <a href={url} style={styleAnchor}>
        <img src={imgurl} alt={title} style={styleImg} />
        <div style={styleDescription}>
          <img src="https://static.affiliate.rakuten.co.jp/makelink/rl.svg" />
          <br />
          {title.slice(0, 20)}...
          <br />
          <b>{value}</b>
          <br />
          {value_date}
        </div>
      </a>
      <div style={styleRecommend}>
        楽天での購入をオススメする理由については、
        <a href="/楽天経済圏について">楽天経済圏に関する記事</a>
        を参考にしてください。
      </div>
    </>
  );
}

export default RakutenAffiliate;
