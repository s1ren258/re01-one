import React from "react";

export default function CharacterCard({
  character,
  className,
  onToggleFavorite,
}) {
  const { id, name, alt, imageSrc, quotes, isFavorite, anime } = character;

  return (
    <div className={`character-card ${className}`}>
      <div className="character-image-container">
        <img src={imageSrc} alt={alt} className="character-image" title={alt} />
        <div className="character-name">{name}</div>
        <div className="character-anime">出自：{anime}</div>
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onToggleFavorite(id)}
          title={isFavorite ? "取消收藏" : "加入收藏"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <React.Fragment key={index}>
            <p className="quote-jp">{quote.jp}</p>
            <p className="quote-cn">{quote.cn}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
