import axios from "axios"
import React, { useEffect, useState, useRef } from "react"

const user = {
  socials: [
    { name: "github", url: "github.com" },
    { name: "twitter", url: "twitter.com" }
  ]
};

let renderTime = 0;

export default function SocialProfiles() {
  const [socials, setSocials] = useState([]);
  // const containerRef = useRef();
  // const listRef = useRef();

  useEffect(() => {
    const resetSocial = () => {
      const newSocials = [...user.socials];
      const tmpSocial = [];
      newSocials.map((item) =>
        tmpSocial.push({
          name: item.name,
          url: item.url,
          editmode: false
        })
      );
      setSocials(tmpSocial);
    };
    resetSocial();
  }, []);

  const handleOnSubmit = (name, e) => {
    e.preventDefault();
    // const ulElem = containerRef.current.childNodes;
    // console.log(Array.from(ulElem));
    const socialsCopied = [...socials];
    const objToInverse = socialsCopied.find((obj) => obj.name === name);
    objToInverse.editmode = !objToInverse.editmode;
    setSocials(socialsCopied);
    console.log(name, e.target);
  };

  const inputGenerator = socials.map((social) => 
    social.editmode ?
      (<li key={social.name} className="input-list">
      <form
        className={`social-form ${social.name}`}
        onSubmit={(e) => handleOnSubmit(social.name, e)}
      >
        <label className="social-input-label" htmlFor="social-input">
          {social.name}
        </label>
        <input
          id="social-input"
          className="social-input"
          type="text"
          defaultValue={social.url}
        />
        <button className="submit-button" type="submit">
          change
        </button>
      </form>
    </li>)
    : <li key={social.name}>
      <div>
      {social.name} : {social.url}
      <button onClick={(e)=>handleOnSubmit(social.name,e)}>change</button>
      </div>
    </li>
  );
  
    console.log("render+")
    renderTime++;
  if (renderTime === 20) {
    console.log("reset")
    renderTime = 0;
  }
  console.log(renderTime, new Date(), "socials", socials[0], socials[1]);
  return (
    <div className="social">
      <h3>mapping</h3>
      <ul>{inputGenerator}</ul>
    </div>
  );
}
