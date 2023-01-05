import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import IconChevron from "../../../public/icons/chevron.svg";
import Link from "next/link";

const CardImg = ({
  url,
  imgSrc,
  imgAlt,
  title,
  content,
  priceM,
  surface,
  availability,
}) => {
  const cardRef = useRef(null);

  const [cardVisible, setCardVisible] =
    useState(false);
  const handleScroll = () => {
    if (!cardRef.current) return;

    if (cardVisible)
      window.removeEventListener(
        "scroll",
        handleScroll,
      );

    const cardRect =
      cardRef.current.getBoundingClientRect();
    const triggerPos = window.innerHeight / 1.25;

    if (
      !cardVisible &&
      cardRect.top -
        cardRect.width -
        triggerPos <=
        0
    )
      setCardVisible(true);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener(
      "scroll",
      handleScroll,
    );
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`${url}`}
      className={`card-img-link${
        cardVisible ? " card-img-link-appear" : ""
      }`}
      scroll={false}
    >
      <article className="card-img">
        <div className="card-img-img-container">
          <img
            src={`/img/${imgSrc}`}
            alt={imgAlt}
            className="card-img-img"
          />
          {availability.now ? (
            <span className="card-img-img-banner-valid">
              <span />
              Disponible
            </span>
          ) : (
            <span className="card-img-img-banner-invalid">
              <span />
              Disponible à partir du{" "}
              {availability.day}{" "}
              {availability.month}
            </span>
          )}
        </div>

        <div className="card-img-content">
          <div>
            <h3 className="card-img-title">
              Bureau {title}
            </h3>
            <h4 className="card-img-price">
              Surface : ≈ {surface} m²
            </h4>
            <h4 className="card-img-price">
              Prix/Mois : {priceM.HT}€ HT
            </h4>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </div>

          <div className="btn-card">
            <IconChevron />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CardImg;
