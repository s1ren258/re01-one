import { useState, useEffect } from "react";
import CharacterCard from "./CharacterCard";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import EmptyState from "./EmptyState";

export default function App() {
  // 1. 角色基础数据
  const initialCharacters = [
    {
      id: 1,
      name: "老八",
      alt: "八奈见杏菜",
      imageSrc: "https://i.imgs.ovh/2025/09/23/7R7R0N.jpeg",
      quotes: [
        { jp: "女の子は2種類に分けられるの", cn: "女生可以分为两大类" },
        { jp: "幼なじみか、泥棒猫か", cn: "要么是青梅，要么是偷腥猫" },
      ],
      isFavorite: false,
      anime: "超超超超喜欢你的100个女朋友",
    },
    {
      id: 2,
      name: "百变小爱",
      alt: "早坂爱",
      imageSrc: "https://i.imgs.ovh/2025/09/23/7RTjnm.jpeg",
      quotes: [
        {
          jp: "もし私をもう少し大切にしないと天罰を被るでしょう",
          cn: "如果不多爱护我一点的话会遭天谴的",
        },
      ],
      isFavorite: false,
      anime: "辉夜大小姐想让我告白",
    },
    {
      id: 3,
      name: "白井黑子",
      alt: "白井黑子",
      imageSrc: "https://i.imgs.ovh/2025/09/24/7RTIS9.png",
      quotes: [
        { jp: "ジャッジメントですの！", cn: "我是风纪委员！" },
        { jp: "お姉さま！！！", cn: "姐姐大人！！！" },
      ],
      isFavorite: false,
      anime: "某科学的超电磁炮",
    },
  ];

  // 2. 状态管理：角色列表、搜索关键词、筛选类型、收藏列表
  const [characters, setCharacters] = useState(initialCharacters);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterType, setFilterType] = useState("all"); // all/favorite/anime
  const [filteredList, setFilteredList] = useState(initialCharacters);

  // 3. 本地存储持久化（收藏状态）
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteCharacters");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      setCharacters((prev) =>
        prev.map((char) => ({
          ...char,
          isFavorite: parsedFavorites.includes(char.id),
        }))
      );
    }
  }, []);

  useEffect(() => {
    const favoriteIds = characters
      .filter((char) => char.isFavorite)
      .map((char) => char.id);
    localStorage.setItem("favoriteCharacters", JSON.stringify(favoriteIds));
  }, [characters]);

  // 4. 搜索+筛选逻辑
  useEffect(() => {
    let result = [...characters];
    // 搜索过滤（匹配角色名/出处）
    if (searchKeyword) {
      const keyword = searchKeyword.toLowerCase();
      result = result.filter(
        (char) =>
          char.name.toLowerCase().includes(keyword) ||
          char.anime.toLowerCase().includes(keyword)
      );
    }
    // 分类筛选
    if (filterType === "favorite") {
      result = result.filter((char) => char.isFavorite);
    } else if (filterType === "anime") {
      // 按出处分组展示（简化逻辑，实际可扩展为下拉选择具体番剧）
      result = result.sort((a, b) => a.anime.localeCompare(b.anime));
    }
    setFilteredList(result);
  }, [searchKeyword, filterType, characters]);

  // 5. 收藏切换功能
  const toggleFavorite = (id) => {
    setCharacters((prev) =>
      prev.map((char) =>
        char.id === id ? { ...char, isFavorite: !char.isFavorite } : char
      )
    );
  };

  // 6. 新增角色功能（支持动态添加）
  const addNewCharacter = (newChar) => {
    setCharacters((prev) => [
      ...prev,
      { ...newChar, id: Date.now(), isFavorite: false },
    ]);
  };

  return (
    <div className="app">
      <h1 className="page-title">动漫角色语录集</h1>
      <SearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        filterType={filterType}
        setFilterType={setFilterType}
      />
      {filteredList.length > 0 ? (
        filteredList.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            className={`character-${character.id}`}
            onToggleFavorite={toggleFavorite}
          />
        ))
      ) : (
        <EmptyState />
      )}
      <Footer />
    </div>
  );
}
