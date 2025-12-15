export default function SearchBar({
  searchKeyword,
  setSearchKeyword,
  filterType,
  setFilterType,
}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="搜索角色/番剧..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="search-input"
      />
      <div className="filter-group">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="all">全部角色</option>
          <option value="favorite">我的收藏</option>
          <option value="anime">按番剧排序</option>
        </select>
      </div>
    </div>
  );
}
