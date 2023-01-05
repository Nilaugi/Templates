import React, { useRef, useEffect } from "react";
import IconFacebook from "../../../public/icons/facebook.svg";
import IconInstagram from "../../../public/icons/instagram.svg";
import IconSocial from "../IconSocial";

const FormPage = ({
  children,
  footerText,
  footerImgSrc,
  footerImgAlt,
  largeForm,
  noContainer,
}) => {
  const articleRef = useRef(null);
  const asideRef = useRef(null);

  const external = [
    {
      id: 0,
      url: "https://www.google.com/maps/place/16+Rue+Faidherbe,+59800+Lille/@50.6368875,3.0639326,17z/data=!3m1!4b1!4m5!3m4!1s0x47c2d589ab427ce3:0x4e57745c5f7bf46a!8m2!3d50.6368841!4d3.0661213?hl=fr",
      label: (
        <address>
          16-18 Rue Faidherbe, Lille 59000
        </address>
      ),
    },
    {
      id: 1,
      url: "tel:0320311311",
      label: "03 20 311 311",
    },
    {
      id: 2,
      url: "tel:0783200600",
      label: "07 83 200 600",
    },
    {
      id: 3,
      url: "mailto:contact.workunion@gmail.com",
      label: "contact.workunion@gmail.com",
    },
  ];

  const icons = [
    {
      id: 0,
      url: "https://www.facebook.com/people/PcGenius-R%C3%A9paration/100088357090978/",
      icon: <IconFacebook />,
    },
    {
      id: 1,
      url: "https://www.instagram.com/pc_genius59/",
      icon: <IconInstagram />,
    },
  ];

  const handleResize = () => {
    if (!articleRef.current || !asideRef.current)
      return;

    if (window.innerWidth < 768) {
      asideRef.current.style.height = `${
        window.innerHeight -
        articleRef.current.offsetHeight -
        96 -
        24
      }px`;
      return;
    }

    asideRef.current.style.height = `100vh`;
  };

  useEffect(() => {
    handleResize();
    window.addEventListener(
      "resize",
      handleResize,
    );
  }, []);

  return (
    <section className="form-page-main">
      <article
        ref={articleRef}
        className={`form-page-form ${
          largeForm ? " form-page-form-large" : ""
        }`}
      >
        {noContainer ? (
          children
        ) : (
          <div>{children}</div>
        )}
      </article>

      <aside
        ref={asideRef}
        className="form-page-aside"
      >
        <div className="form-page-aside-wrapper">
          <p className="form-page-aside-text">
            {footerText}
          </p>

          <div>
            <div>
              {external.map(
                ({ id, url, label }) => (
                  <a
                    key={id}
                    href={url}
                    className="form-page-aside-external link link-footer-space"
                    target="blank"
                  >
                    {label}
                  </a>
                ),
              )}
            </div>

            <div className="form-page-aside-icon-wrapper">
              {icons.map(({ id, url, icon }) => (
                <IconSocial
                  key={id}
                  url={url}
                  icon={icon}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default FormPage;
