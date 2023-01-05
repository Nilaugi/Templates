import React from "react";
import CardImg from "./CardImg";
import Container from "../../layouts/Container";

const CardImgWrapper = ({
  title,
  text,
  subtitle,
  items,
}) => {
  return (
    <section className="card-img-section">
      <Container>
        <h2 className="card-img-head-title">
          {title}
        </h2>

        <p
          className="card-img-head-text"
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        />

        <h3 className="card-img-head-subtitle">
          {subtitle}
        </h3>
      </Container>

      <div className="card-img-wrapper">
        {items.map(
          ({
            id,
            imgSrc,
            imgAlt,
            title,
            description,
            priceM,
            surface,
            availability,
          }) => (
            <CardImg
              key={id}
              url={`/bureaux#${id}`}
              imgSrc={imgSrc}
              imgAlt={imgAlt}
              title={title}
              content={description}
              priceM={priceM}
              surface={surface}
              availability={availability}
            />
          ),
        )}
      </div>
    </section>
  );
};

export default CardImgWrapper;
