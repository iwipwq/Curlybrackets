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
  const socialUrlRefs = useRef([]);
  // const containerRef = useRef();
  // const listRef = useRef();

  useEffect(() => {
    const getSocial = () => {
      const $socials = [...user.socials];
      const socialsWithEditmode = [];
      $socials.map((item) =>
      socialsWithEditmode.push({
          name: item.name,
          url: item.url,
          editmode: false
        })
        //setSocials([...user.socials,name:itme])
      );
      setSocials(socialsWithEditmode);
    };
    getSocial();
  }, []);

  const handleOnSubmit = (name, index, e) => {
    e.preventDefault();
    // const ulElem = containerRef.current.childNodes;
    // console.log(Array.from(ulElem));
    console.log(socialUrlRefs.current[index]?.value);
    const $socials = [...socials];
    const currentElementState = $socials.find((obj) => obj.name === name);
    currentElementState.editmode = !currentElementState.editmode;
    setSocials($socials);
    console.log(name, e.target);
  };

  const socialItemEditmode = (social, index) => (
    <li key={social.name} className="input-list">
      <form
        className={`social-form ${social.name}`}
        onSubmit={(e) => handleOnSubmit(social.name, index, e)}
      >
        <label className="social-input-label" htmlFor="social-input">
          {social.name}
        </label>
        <input
          id="social-input"
          className="social-input"
          type="text"
          defaultValue={social.url}
          ref={currentRef => socialUrlRefs[index] = currentRef}
        />
        <button className="submit-button" type="submit">
          change
        </button>
      </form>
    </li>
  )

  const socialItem = (social) => (
    <li key={social.name}>
      <div>
      {social.name} : {social.url}
      <button onClick={(e)=>handleOnSubmit(social.name,e)}>change</button>
      </div>
    </li>
  )

  const renderSocialList = socials.map((social, index) => 
    social.editmode ? socialItemEditmode(social, index) : socialItem(social)
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
      <ul>{renderSocialList}</ul>
    </div>
  );
}
